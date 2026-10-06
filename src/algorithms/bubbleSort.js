export function* bubbleSort(input) {
  const a = [...input];
  const n = a.length;
  const sorted = [];
  let comparisons = 0;
  let swaps = 0;

  const frame = (active, msg, swap = false) =>
    ({ values: [...a], active, marked: [], sorted: [...sorted], swap, comparisons, swaps, msg });

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;

    // after each pass the largest unsorted value has moved to the end
    for (let i = 0; i < n - 1 - pass; i++) {
      comparisons++;
      yield frame([i, i + 1], `Comparing ${a[i]} and ${a[i + 1]}`);

      if (a[i] > a[i + 1]) {
        const message = `${a[i]} > ${a[i + 1]} → swap`;
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swaps++;
        swapped = true;
        yield frame([i, i + 1], message, true);
      }
    }

    sorted.push(n - 1 - pass);
    yield frame([], `${a[n - 1 - pass]} is now in its final position`);
    if (!swapped) break;
  }

  yield { ...frame([], 'Sorted: no more swaps are needed'), sorted: a.map((_, i) => i), finished: true };
}
