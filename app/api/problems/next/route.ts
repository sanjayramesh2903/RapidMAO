import { NextRequest, NextResponse } from 'next/server';
import { FamatProblem, Round, famatProblems } from '@/lib/problems';

type Body = {
  seenIds: string[];
  roundFilter: Round | 'All';
  rating: number;
  mode: 'infinite' | 'timed' | 'simulation';
  simulationQueue?: string[];
  simulationIndex?: number;
};

function targetDifficulty(rating: number): number {
  if (rating < 930) return 1;
  if (rating < 1030) return 2;
  if (rating < 1160) return 3;
  if (rating < 1300) return 4;
  return 5;
}

function pickClosest(candidates: FamatProblem[], rating: number): FamatProblem | null {
  if (!candidates.length) return null;
  const target = targetDifficulty(rating);
  const sorted = [...candidates].sort(
    (a, b) => Math.abs(a.difficulty - target) - Math.abs(b.difficulty - target)
  );
  const topBand = sorted.filter(
    (p) => Math.abs(p.difficulty - target) === Math.abs(sorted[0].difficulty - target)
  );
  return topBand[Math.floor(Math.random() * topBand.length)] ?? null;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;
  const seen = new Set(body.seenIds ?? []);

  if (body.mode === 'simulation') {
    const queue = body.simulationQueue ?? [];
    const idx = body.simulationIndex ?? 0;
    const nextId = queue[idx];
    const problem = famatProblems.find((p) => p.id === nextId) ?? null;
    return NextResponse.json({ problem, exhausted: !problem });
  }

  const scoped = famatProblems.filter((p) => body.roundFilter === 'All' || p.round === body.roundFilter);

  let available = scoped.filter((p) => !seen.has(p.id));
  if (!available.length) available = scoped;

  const problem = pickClosest(available, body.rating);
  return NextResponse.json({ problem, exhausted: !problem, poolSize: scoped.length });
}
