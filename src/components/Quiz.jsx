import { useState } from 'react';
export default function Quiz({ quiz }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  return (
    <section className="quiz">
      <h2>Quick check</h2>
      <p>{quiz.q}</p>
      <div className="opts">
        {quiz.options.map((o, i) => (
          <button key={o} onClick={() => setPicked(i)}
            className={`btn${answered && i === quiz.answer ? ' right' : ''}${picked === i && i !== quiz.answer ? ' wrong' : ''}`}>
            {answered && i === quiz.answer ? '✓ ' : ''}{o}
          </button>
        ))}
      </div>
      {answered && <p role="status" className="why"><strong>{picked === quiz.answer ? 'Correct. ' : 'Not quite. '}</strong>{quiz.why}</p>}
    </section>
  );
}
