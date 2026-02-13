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

const sourceFilter = document.getElementById('source-filter');
const levelFilter = document.getElementById('level-filter');
const randomBtn = document.getElementById('random-btn');
const resetBtn = document.getElementById('reset-btn');
const problemCard = document.getElementById('problem-card');
const poolCount = document.getElementById('pool-count');

function uniqueValues(key) {
  return [...new Set(problems.map((problem) => problem[key]))];
}

function populateFilters() {
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

function renderNoMatch() {
  problemCard.innerHTML = `
    <div class="no-results">
      No problems match those filters. Adjust your regional source or level and try again.
    </div>
  `;
}

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
}

populateFilters();
setupEventListeners();
pickRandomProblem();
