import { useState, useRef, useEffect, useCallback } from 'react';
const ZERO = { steps: 0, swaps: 0, comparisons: 0 };

// Drives an algorithm generator: step() advances it by one yield; play runs step() on a timer.
export default function useStepper(createGen, delay) {
  const gen = useRef(null);
  const [frame, setFrame] = useState(null);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState(ZERO);

  const reset = useCallback(() => {
    gen.current = createGen();
    setFrame(null); setDone(false); setPlaying(false); setStats(ZERO);
  }, [createGen]);
  useEffect(() => { reset(); }, [reset]);

  const step = useCallback(() => {
    const r = gen.current.next();
    if (r.done) { setDone(true); setPlaying(false); return; }
    const v = r.value;
    setFrame(v);
    setStats(s => ({
      steps: s.steps + 1,
      swaps: s.swaps + (v.swap ? 1 : 0),
      comparisons: s.comparisons + (/^(Comparing|Middle)/.test(v.msg) ? 1 : 0),
    }));
    if (v.finished) { setDone(true); setPlaying(false); }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(step, delay);
    return () => clearInterval(id);
  }, [playing, delay, step]);

  const replay = () => { reset(); setPlaying(true); };
  return { frame, done, playing, stats, step, reset, replay, toggle: () => setPlaying(p => !p) };
}
