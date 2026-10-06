export default function About() {
  return (
    <main className="wrap narrow">
      <h1>About</h1>
      <p>I built Algorithm Lab to strengthen my understanding of fundamental algorithms by turning their logic into interactive visualizations.</p>
      <p>Each algorithm is written by hand as a JavaScript generator: every <code>yield</code> is one step that the interface displays. That keeps the algorithm code close to its textbook pseudocode, separate from the drawing code.</p>
      <p>The project uses React and Vite with no other libraries. I am still learning, so if you find a mistake in an explanation or a complexity, I would be glad to hear about it.</p>
    </main>
  );
}
