import { useState, useEffect } from 'react';
import { ALGORITHMS } from './data/algorithms.js';
import Home, { Catalog } from './pages/Home.jsx';
import Algorithm from './pages/Algorithm.jsx';
import About from './pages/About.jsx';
import Backdrop from './components/Backdrop.jsx';

// Hash routing (#/algorithm/bfs) needs no server config, so it works on GitHub Pages
const parse = () => location.hash.replace(/^#\/?/, '').split('/');

export default function App() {
  const [[page, id], setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  let view = <Home />;
  if (page === 'algorithm' && ALGORITHMS[id]) view = <Algorithm key={id} id={id} />;
  else if (page === 'algorithms') view = <main className="wrap"><h1>Algorithms</h1><Catalog /></main>;
  else if (page === 'about') view = <About />;

  const cur = name => (page === name ? 'page' : undefined);
  return (
    <>
      <Backdrop />
      <header>
        <a className="logo" href="#/">Algorithm Lab</a>
        <nav aria-label="Main">
          <a href="#/algorithm/bubble-sort" aria-current={cur('algorithm')}>Visualizer</a>
          <a href="#/algorithms" aria-current={cur('algorithms')}>Algorithms</a>
          <a href="#/about" aria-current={cur('about')}>About</a>
        </nav>
      </header>
      {view}
    </>
  );
}
