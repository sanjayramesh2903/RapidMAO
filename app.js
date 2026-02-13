const problems = [
  {
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
renderProblems();
