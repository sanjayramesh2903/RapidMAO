'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import katex from 'katex';
import { FamatProblem, Round, famatProblems, rounds } from '@/lib/problems';

type Mode = 'infinite' | 'timed' | 'simulation';

function renderMathInline(text: string) {
  return text.replace(/\$(.+?)\$/g, (_, expr) =>
    katex.renderToString(expr, { throwOnError: false, displayMode: false })
  );
}

function normalizeAnswer(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, '');
}

function simulationSet(roundFilter: Round | 'All') {
  const base = famatProblems.filter((p) => roundFilter === 'All' || p.round === roundFilter);
  const sorted = [...base].sort((a, b) => a.year - b.year || a.number - b.number);
  const selection = sorted.slice(0, Math.min(25, sorted.length)).map((p) => p.id);
  return selection;
}

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>('infinite');
  const [roundFilter, setRoundFilter] = useState<Round | 'All'>('All');
  const [problem, setProblem] = useState<FamatProblem | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [message, setMessage] = useState('');
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [sessionSolved, setSessionSolved] = useState(0);
  const [allTimeSolved, setAllTimeSolved] = useState(0);
  const [rating, setRating] = useState(1000);
  const [dark, setDark] = useState(false);
  const [topicPerf, setTopicPerf] = useState<Record<string, { correct: number; attempts: number }>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timedCorrect, setTimedCorrect] = useState(0);
  const [simulationQueue, setSimulationQueue] = useState<string[]>([]);
  const [simulationIndex, setSimulationIndex] = useState(0);

  useEffect(() => {
    const solved = Number(localStorage.getItem('famatrivial_all_solved') || '0');
    const best = Number(localStorage.getItem('famatrivial_best_streak') || '0');
    const storedPerf = localStorage.getItem('famatrivial_perf');
    setAllTimeSolved(solved);
    setBestStreak(best);
    if (storedPerf) setTopicPerf(JSON.parse(storedPerf));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const streakClass = feedback === 'correct' ? 'text-green-600' : feedback === 'incorrect' ? 'text-red-600' : 'text-accent';

  const timerLabel = useMemo(() => {
    if (timeLeft === null) return '∞';
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = Math.floor(timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [timeLeft]);

  async function fetchProblem(nextSeen = seenIds, simIndex = simulationIndex, simQueue = simulationQueue) {
    const res = await fetch('/api/problems/next', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seenIds: nextSeen, roundFilter, rating, mode, simulationIndex: simIndex, simulationQueue: simQueue })
    });
    const data = await res.json();
    if (data.problem) {
      setProblem(data.problem);
      setFeedback('idle');
      setMessage('');
      setAnswer('');
      setSubmitting(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  useEffect(() => {
    const reset = async () => {
      setSeenIds([]);
      setCurrentStreak(0);
      setSessionSolved(0);
      setTimedCorrect(0);
      if (mode === 'timed') setTimeLeft(600);
      if (mode === 'simulation') {
        const q = simulationSet(roundFilter);
        setSimulationQueue(q);
        setSimulationIndex(0);
        setTimeLeft(2400);
        await fetchProblem([], 0, q);
        return;
      }
      setTimeLeft(mode === 'infinite' ? null : 600);
      await fetchProblem([]);
    };
    reset();
  }, [mode, roundFilter]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((v) => (v === null ? null : v - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  function recordTopic(round: string, correct: boolean) {
    setTopicPerf((prev) => {
      const next = { ...prev };
      const row = next[round] || { correct: 0, attempts: 0 };
      row.attempts += 1;
      if (correct) row.correct += 1;
      next[round] = row;
      localStorage.setItem('famatrivial_perf', JSON.stringify(next));
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!problem || submitting || (timeLeft !== null && timeLeft <= 0)) return;
    setSubmitting(true);

    const isCorrect = normalizeAnswer(answer) === normalizeAnswer(problem.answer);
    recordTopic(problem.round, isCorrect);

    if (isCorrect) {
      setFeedback('correct');
      setMessage('✓ Correct');
      setCurrentStreak((s) => {
        const n = s + 1;
        setBestStreak((b) => {
          const next = Math.max(b, n);
          localStorage.setItem('famatrivial_best_streak', String(next));
          return next;
        });
        return n;
      });
      setSessionSolved((s) => s + 1);
      setAllTimeSolved((s) => {
        const n = s + 1;
        localStorage.setItem('famatrivial_all_solved', String(n));
        return n;
      });
      setRating((r) => r + 8);
      if (mode === 'timed' || mode === 'simulation') setTimedCorrect((s) => s + 1);

      const nextSeen = [...seenIds, problem.id];
      setSeenIds(nextSeen);
      if (mode === 'simulation') {
        const nextIndex = simulationIndex + 1;
        setSimulationIndex(nextIndex);
        setTimeout(() => fetchProblem(nextSeen, nextIndex, simulationQueue), 700);
      } else {
        setTimeout(() => fetchProblem(nextSeen), 700);
      }
      return;
    }

    setFeedback('incorrect');
    setMessage(`✗ ${problem.solution} (Ans: ${problem.answer})`);
    setCurrentStreak(0);
    setRating((r) => Math.max(800, r - 12));
    setSubmitting(false);
  }

  const simulationScore = useMemo(() => {
    if (mode !== 'simulation') return null;
    const answered = simulationIndex;
    const unanswered = Math.max(0, 25 - answered);
    return timedCorrect * 6 + unanswered * 1.5;
  }, [mode, simulationIndex, timedCorrect]);

  const perfSnippet = Object.entries(topicPerf)
    .slice(0, 3)
    .map(([k, v]) => `${k}: ${Math.round((v.correct / Math.max(1, v.attempts)) * 100)}%`)
    .join(' · ');

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-4">
      <header className="mb-8 flex items-center justify-between text-sm">
        <div className="font-bold">FAMATrivial</div>
        <div className="flex items-center gap-4">
          <span className={`text-2xl font-extrabold ${streakClass}`}>{currentStreak}</span>
          <button className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700" onClick={() => setDark((v) => !v)}>
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
        <select className="rounded border px-2 py-1 dark:bg-zinc-900" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="infinite">Infinite</option>
          <option value="timed">Timed 10m</option>
          <option value="simulation">Simulation 25Q</option>
        </select>
        <select className="rounded border px-2 py-1 dark:bg-zinc-900" value={roundFilter} onChange={(e) => setRoundFilter(e.target.value as Round | 'All')}>
          <option value="All">All Rounds</option>
          {rounds.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <span>Timer: {timerLabel}</span>
        <span>Best: {bestStreak}</span>
        <span>Solved: {allTimeSolved}</span>
        <span>Rating: {rating}</span>
      </div>

      <section className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        {problem && (
          <>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{problem.year} · {problem.round} · #{problem.number} · ~{problem.estimatedSolveTimeSec}s</div>
            <div
              key={problem.id}
              className="w-full max-w-3xl rounded border border-zinc-200 p-6 text-2xl leading-relaxed transition-opacity dark:border-zinc-800"
              dangerouslySetInnerHTML={{ __html: renderMathInline(problem.prompt) }}
            />
            <form className="flex w-full max-w-xl gap-2" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="flex-1 rounded border border-zinc-300 px-3 py-2 text-lg dark:border-zinc-700 dark:bg-zinc-900"
              />
              <button type="submit" disabled={submitting} className="rounded bg-accent px-4 py-2 font-semibold text-white disabled:opacity-60">
                Submit
              </button>
            </form>
            <div className={`min-h-6 text-sm ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
            {feedback === 'incorrect' && (
              <button
                className="rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
                onClick={() => {
                  const nextSeen = [...seenIds, problem.id];
                  setSeenIds(nextSeen);
                  if (mode === 'simulation') {
                    const nextIndex = simulationIndex + 1;
                    setSimulationIndex(nextIndex);
                    fetchProblem(nextSeen, nextIndex, simulationQueue);
                  } else {
                    fetchProblem(nextSeen);
                  }
                }}
              >
                Next Problem
              </button>
            )}
          </>
        )}
      </section>

      <footer className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Session solved: {sessionSolved} {mode !== 'infinite' && `· Score: ${timedCorrect}`} {simulationScore !== null && `· AMC score: ${simulationScore.toFixed(1)}`}
        {perfSnippet && ` · ${perfSnippet}`}
      </footer>
    </main>
  );
}
