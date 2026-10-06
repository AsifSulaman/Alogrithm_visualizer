# Algorithm Lab

An interactive visualizer that shows how common algorithms work, one step at a time. I built it to understand the algorithms better by turning their logic into something I can watch.

**Live demo:** https://asifsulaman.github.io/Alogrithm_visualizer/#/

## Algorithms

| Category | Algorithms |
| --- | --- |
| Sorting | Bubble Sort, Selection Sort, Insertion Sort |
| Searching | Binary Search |
| Graph traversal | BFS, DFS |

Each algorithm page has an explanation, a step-by-step visualization, pseudocode, complexity, and a short quiz.

## Features

- Start, pause, step, reset and replay, with an adjustable speed
- Live description of what the algorithm is doing at each step
- Counters for comparisons and swaps (sorting) and middle checks (binary search)
- Custom input with validation, plus "nearly sorted" and "reversed" arrays to compare best and worst cases
- Random graphs, with a clickable start node for BFS and DFS
- Responsive layout, keyboard-accessible controls, and symbols alongside colours

## Run it locally

You need [Node.js](https://nodejs.org) (LTS).

```bash
git clone https://asifsulaman.github.io/Alogrithm_visualizer/#/
cd algorithm-lab
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

To build for production: `npm run build` (output goes to `dist/`).

## How it works

Each algorithm is a plain JavaScript generator in `src/algorithms/`. Every `yield` is one step, and the interface just draws whatever the algorithm yields. That keeps the algorithm code close to the textbook pseudocode.

```
src/
├── algorithms/   bubbleSort, selectionSort, insertionSort, binarySearch, bfs, dfs, graph
├── components/   BarsView, SearchView, GraphView, Quiz, Backdrop
├── data/         explanations, complexities, pseudocode, quiz questions
└── pages/        Home, Algorithm, About
```

## Built with

React and Vite. No other libraries.
