const problems = [
  {
    level: 'Alg 1',
    source: 'January Regional',
    question: 4,
    title: 'Linear System Value',
    statement: 'If $3x - 2 = 16$, compute $2x^2 - x$.'
  },
  {
    level: 'Geometry',
    source: 'February Regional',
    question: 9,
    title: 'Circle Chord Length',
    statement: 'A circle has radius $10$. A chord is $12$ units from the center. Find the chord length.'
  },
  {
    level: 'Stats',
    source: 'March Regional',
    question: 6,
    title: 'Mean After New Data',
    statement: 'The mean of five numbers is $14$. A sixth number $x$ is added and the new mean is $16$. Find $x$.'
  },
  {
    level: 'Alg 2',
    source: 'January Regional',
    question: 12,
    title: 'Quadratic Root Sum',
    statement: 'For the equation $2t^2 - 7t + 3 = 0$, what is the sum of the roots?'
  },
  {
    level: 'Calc',
    source: 'March Regional',
    question: 15,
    title: 'Derivative Evaluation',
    statement: "Let $f(x) = x^3 - 4x^2 + 6x$. Compute $f'(2)$."
  },
  {
    level: 'Precalc',
    source: 'February Regional',
    question: 11,
    title: 'Trig Identity Check',
    statement: 'If $\\sin(\\theta)=\\frac{3}{5}$ and $\\theta$ is in Quadrant II, find $\\cos(\\theta)$. '
  }
];

function getElements() {
  const sourceFilter = document.getElementById('source-filter');
  const levelFilter = document.getElementById('level-filter');
  const randomBtn = document.getElementById('random-btn');
  const resetBtn = document.getElementById('reset-btn');
  const problemCard = document.getElementById('problem-card');
  const poolCount = document.getElementById('pool-count');

  if (!sourceFilter || !levelFilter || !randomBtn || !resetBtn || !problemCard || !poolCount) {
    throw new Error('Missing required UI elements for problem randomizer');
  }

  return { sourceFilter, levelFilter, randomBtn, resetBtn, problemCard, poolCount };
}

function filteredProblems(sourceFilter, levelFilter) {
const sourceFilter = document.getElementById('source-filter');
const levelFilter = document.getElementById('level-filter');
const randomBtn = document.getElementById('random-btn');
const resetBtn = document.getElementById('reset-btn');
const problemCard = document.getElementById('problem-card');
const poolCount = document.getElementById('pool-count');
    subject: 'Alg 1',
    source: 'January Regional',
    question: 4,
    title: 'Linear System Value',
    statement:
      'If $3x - 2 = 16$, compute $2x^2 - x$.'
  },
  {
    subject: 'Geometry',
    source: 'February Regional',
    question: 9,
    title: 'Circle Chord Length',
    statement:
      'A circle has radius $10$. A chord is $12$ units from the center. Find the chord length.'
  },
  {
    subject: 'Stats',
    source: 'March Regional',
    question: 6,
    title: 'Mean After New Data',
    statement:
      'The mean of five numbers is $14$. A sixth number $x$ is added and the new mean is $16$. Find $x$.'
  },
  {
    subject: 'Alg 2',
    source: 'January Regional',
    question: 12,
    title: 'Quadratic Root Sum',
    statement:
      'For the equation $2t^2 - 7t + 3 = 0$, what is the sum of the roots?'
  },
  {
    subject: 'Calc',
    source: 'March Regional',
    question: 15,
    title: 'Derivative Evaluation',
    statement:
      'Let $f(x) = x^3 - 4x^2 + 6x$. Compute $f\'(2)$.'
  },
  {
    subject: 'Precalc',
    source: 'February Regional',
    question: 11,
    title: 'Trig Identity Check',
    statement:
      'If $\sin(\theta)=\frac{3}{5}$ and $\theta$ is in Quadrant II, find $\cos(\theta)$.'
  }
];

const subjectFilter = document.getElementById('subject-filter');
const sourceFilter = document.getElementById('source-filter');
const resetBtn = document.getElementById('reset-btn');
const problemGrid = document.getElementById('problem-grid');
const problemCount = document.getElementById('problem-count');

function uniqueValues(key) {
  return [...new Set(problems.map((problem) => problem[key]))];
}

function populateFilters() {
  uniqueValues('subject').forEach((subject) => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectFilter.append(option);
  });

  uniqueValues('source').forEach((source) => {
    const option = document.createElement('option');
    option.value = source;
    option.textContent = source;
    sourceFilter.append(option);
  });

  uniqueValues('level').forEach((level) => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level;
    levelFilter.append(option);
  });
}

function filteredProblems() {
  const selectedSource = sourceFilter.value;
  const selectedLevel = levelFilter.value;

  return problems.filter((problem) => {
    const sourceMatch = selectedSource === 'all' || problem.source === selectedSource;
    const levelMatch = selectedLevel === 'all' || problem.level === selectedLevel;
    return sourceMatch && levelMatch;
  });
}

function updatePoolCount(poolCount, pool) {
  poolCount.textContent = `Current random pool: ${pool.length} problem${pool.length === 1 ? '' : 's'}.`;
}

function renderProblem(problemCard, problem) {
function updatePoolCount(pool) {
  poolCount.textContent = `Current random pool: ${pool.length} problem${pool.length === 1 ? '' : 's'}.`;
}

function renderProblem(problem) {
  problemCard.innerHTML = `
    <div class="card-meta">
      <span class="tag">${problem.level}</span>
      <span class="tag">${problem.source}</span>
      <span class="tag">Q${problem.question}</span>
    </div>
    <h3>${problem.title}</h3>
    <p class="problem-statement">${problem.statement}</p>
  `;

  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise([problemCard]);
  }
}

function renderNoMatch(problemCard) {
function renderNoMatch() {
  problemCard.innerHTML = `
    <div class="no-results">
      No problems match those filters. Adjust your regional source or level and try again.
    </div>
  `;
}

function bootstrapRandomizer() {
  const { sourceFilter, levelFilter, randomBtn, resetBtn, problemCard, poolCount } = getElements();

  const pickRandomProblem = () => {
    const pool = filteredProblems(sourceFilter, levelFilter);
    updatePoolCount(poolCount, pool);

    if (!pool.length) {
      renderNoMatch(problemCard);
      return;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    renderProblem(problemCard, pool[randomIndex]);
  };

  randomBtn.addEventListener('click', pickRandomProblem);

  sourceFilter.addEventListener('change', () => {
    const pool = filteredProblems(sourceFilter, levelFilter);
    updatePoolCount(poolCount, pool);
  });

  levelFilter.addEventListener('change', () => {
    const pool = filteredProblems(sourceFilter, levelFilter);
    updatePoolCount(poolCount, pool);
function pickRandomProblem() {
  const pool = filteredProblems();
  updatePoolCount(pool);

  if (!pool.length) {
    renderNoMatch();
    return;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  renderProblem(pool[randomIndex]);
}

function setupEventListeners() {
  randomBtn.addEventListener('click', pickRandomProblem);

  sourceFilter.addEventListener('change', () => {
    const pool = filteredProblems();
    updatePoolCount(pool);
  });

  levelFilter.addEventListener('change', () => {
    const pool = filteredProblems();
    updatePoolCount(pool);
  });

  resetBtn.addEventListener('click', () => {
    sourceFilter.value = 'all';
    levelFilter.value = 'all';
    pickRandomProblem();
  });

  pickRandomProblem();
}

document.addEventListener('DOMContentLoaded', bootstrapRandomizer);
}

function renderProblems() {
  const selectedSubject = subjectFilter.value;
  const selectedSource = sourceFilter.value;

  const filtered = problems.filter((problem) => {
    const subjectMatch = selectedSubject === 'all' || problem.subject === selectedSubject;
    const sourceMatch = selectedSource === 'all' || problem.source === selectedSource;
    return subjectMatch && sourceMatch;
  });

  problemGrid.innerHTML = '';

  if (!filtered.length) {
    problemGrid.innerHTML =
      '<div class="no-results">No problems found for the selected filters.</div>';
    problemCount.textContent = 'Showing 0 problems.';
    return;
  }

  filtered.forEach((problem) => {
    const card = document.createElement('article');
    card.className = 'problem-card';

    card.innerHTML = `
      <div class="card-meta">
        <span class="tag">${problem.subject}</span>
        <span class="tag">${problem.source}</span>
        <span class="tag">Q${problem.question}</span>
      </div>
      <h3>${problem.title}</h3>
      <p class="problem-statement">${problem.statement}</p>
    `;

    problemGrid.append(card);
  });

  problemCount.textContent = `Showing ${filtered.length} problem${filtered.length === 1 ? '' : 's'}.`;

  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}

function setupEventListeners() {
  subjectFilter.addEventListener('change', renderProblems);
  sourceFilter.addEventListener('change', renderProblems);
  resetBtn.addEventListener('click', () => {
    subjectFilter.value = 'all';
    sourceFilter.value = 'all';
    renderProblems();
  });
}

populateFilters();
setupEventListeners();
pickRandomProblem();
renderProblems();
