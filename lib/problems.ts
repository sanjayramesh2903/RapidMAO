export type Round = 'Algebra 1' | 'Algebra 2' | 'Statistics' | 'Geometry' | 'Calculus' | 'Pre-Calculus';

export type FamatProblem = {
  id: string;
  year: number;
  round: Round;
  number: number;
  prompt: string;
  answer: string;
  solution: string;
  estimatedSolveTimeSec: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export const rounds: Round[] = ['Algebra 1', 'Algebra 2', 'Statistics', 'Geometry', 'Calculus', 'Pre-Calculus'];

export const famatProblems: FamatProblem[] = [
  { id: 'a1-24-1', year: 2024, round: 'Algebra 1', number: 1, prompt: 'Solve $2x+7=19$.', answer: '6', solution: 'Subtract $7$ then divide by $2$.', estimatedSolveTimeSec: 20, difficulty: 1 },
  { id: 'a1-24-7', year: 2024, round: 'Algebra 1', number: 7, prompt: 'If $x^2-5x+6=0$, find $x_1+x_2$.', answer: '5', solution: 'For $ax^2+bx+c$, sum of roots is $-b/a=5$.', estimatedSolveTimeSec: 35, difficulty: 2 },
  { id: 'a1-23-12', year: 2023, round: 'Algebra 1', number: 12, prompt: 'If $3^{x}=81$, compute $x+2$.', answer: '6', solution: '$81=3^4$, so $x=4$, then add $2$.', estimatedSolveTimeSec: 25, difficulty: 2 },
  { id: 'a1-22-18', year: 2022, round: 'Algebra 1', number: 18, prompt: 'Simplify $\frac{x^2-9}{x-3}$ for $x\ne 3$.', answer: 'x+3', solution: 'Factor numerator: $(x-3)(x+3)$.', estimatedSolveTimeSec: 30, difficulty: 3 },

  { id: 'a2-24-3', year: 2024, round: 'Algebra 2', number: 3, prompt: 'Find the vertex x-coordinate of $y=x^2-8x+1$.', answer: '4', solution: 'Use $-b/(2a)=8/2=4$.', estimatedSolveTimeSec: 30, difficulty: 1 },
  { id: 'a2-24-11', year: 2024, round: 'Algebra 2', number: 11, prompt: 'If $\log_2 n=5$, find $n$.', answer: '32', solution: 'Exponentiate base $2$: $n=2^5$.', estimatedSolveTimeSec: 20, difficulty: 2 },
  { id: 'a2-23-15', year: 2023, round: 'Algebra 2', number: 15, prompt: 'Solve $|2x-1|=7$ and give the larger solution.', answer: '4', solution: 'Cases: $2x-1=7$ or $-7$. Larger is $x=4$.', estimatedSolveTimeSec: 40, difficulty: 3 },
  { id: 'a2-22-21', year: 2022, round: 'Algebra 2', number: 21, prompt: 'For geometric sequence $3,6,12,\ldots$, what is term 7?', answer: '192', solution: '$a_n=3\cdot2^{n-1}$ so $a_7=3\cdot2^6$.', estimatedSolveTimeSec: 45, difficulty: 4 },

  { id: 's-24-2', year: 2024, round: 'Statistics', number: 2, prompt: 'Mean of $8,10,12$?', answer: '10', solution: 'Sum is $30$, divide by $3$.', estimatedSolveTimeSec: 15, difficulty: 1 },
  { id: 's-24-8', year: 2024, round: 'Statistics', number: 8, prompt: 'Median of $4,9,1,7,6$?', answer: '6', solution: 'Sort: $1,4,6,7,9$.', estimatedSolveTimeSec: 20, difficulty: 1 },
  { id: 's-23-14', year: 2023, round: 'Statistics', number: 14, prompt: 'A data set has mean $14$ for $5$ values. Add $x$ to make new mean $16$ over $6$ values. Find $x$.', answer: '26', solution: 'Old sum $70$, new sum $96$, so $x=26$.', estimatedSolveTimeSec: 35, difficulty: 2 },
  { id: 's-22-19', year: 2022, round: 'Statistics', number: 19, prompt: 'If event probability is $0.2$, expected successes in $50$ trials?', answer: '10', solution: 'Use $np=50(0.2)=10$.', estimatedSolveTimeSec: 30, difficulty: 3 },

  { id: 'g-24-4', year: 2024, round: 'Geometry', number: 4, prompt: 'Area of a right triangle with legs $6$ and $8$?', answer: '24', solution: 'Area $=\frac12(6)(8)=24$.', estimatedSolveTimeSec: 20, difficulty: 1 },
  { id: 'g-24-10', year: 2024, round: 'Geometry', number: 10, prompt: 'Circumference of circle radius $5$ in terms of $\pi$.', answer: '10pi', solution: '$C=2\pi r=10\pi$.', estimatedSolveTimeSec: 20, difficulty: 2 },
  { id: 'g-23-16', year: 2023, round: 'Geometry', number: 16, prompt: 'A chord is $12$ from center of radius-$13$ circle. Find chord length.', answer: '10', solution: 'Half chord is $\sqrt{13^2-12^2}=5$. Double it.', estimatedSolveTimeSec: 45, difficulty: 3 },
  { id: 'g-22-23', year: 2022, round: 'Geometry', number: 23, prompt: 'Interior angle of regular decagon?', answer: '144', solution: '$180-360/10=144$.', estimatedSolveTimeSec: 35, difficulty: 4 },

  { id: 'c-24-5', year: 2024, round: 'Calculus', number: 5, prompt: 'If $f(x)=x^3$, compute $f\'(2)$.', answer: '12', solution: '$f\'(x)=3x^2$, plug in $2$.', estimatedSolveTimeSec: 25, difficulty: 1 },
  { id: 'c-24-13', year: 2024, round: 'Calculus', number: 13, prompt: '$\int_0^2 3x\,dx=$ ?', answer: '6', solution: 'Antiderivative $\frac{3x^2}{2}$ from $0$ to $2$.', estimatedSolveTimeSec: 30, difficulty: 2 },
  { id: 'c-23-20', year: 2023, round: 'Calculus', number: 20, prompt: 'For $f(x)=x^2-4x$, where is the minimum x-value attained?', answer: '2', solution: 'Vertex/critical point at $x=2$.', estimatedSolveTimeSec: 35, difficulty: 3 },
  { id: 'c-22-25', year: 2022, round: 'Calculus', number: 25, prompt: 'If $f\'(x)=2x+1$, and $f(0)=3$, find $f(1)$.', answer: '5', solution: '$f(x)=x^2+x+3$, so $f(1)=5$.', estimatedSolveTimeSec: 50, difficulty: 5 },

  { id: 'p-24-6', year: 2024, round: 'Pre-Calculus', number: 6, prompt: 'If $\sin\theta=\frac35$ in QII, find $\cos\theta$.', answer: '-4/5', solution: 'Reference triangle and QII sign.', estimatedSolveTimeSec: 30, difficulty: 2 },
  { id: 'p-24-9', year: 2024, round: 'Pre-Calculus', number: 9, prompt: 'Compute $\cos(60^\circ)+\sin(30^\circ)$.', answer: '1', solution: 'Each is $\frac12$.', estimatedSolveTimeSec: 15, difficulty: 1 },
  { id: 'p-23-17', year: 2023, round: 'Pre-Calculus', number: 17, prompt: 'Find period of $y=\sin(3x)$.', answer: '2pi/3', solution: 'Period is $2\pi/|3|$.', estimatedSolveTimeSec: 30, difficulty: 3 },
  { id: 'p-22-24', year: 2022, round: 'Pre-Calculus', number: 24, prompt: 'If $a_n=2n+1$, find $\sum_{n=1}^{10} a_n$.', answer: '120', solution: 'Arithmetic sequence terms 3 to 21, average 12 times 10.', estimatedSolveTimeSec: 45, difficulty: 4 }
];
