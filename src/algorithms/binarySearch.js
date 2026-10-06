// The array must already be sorted.
export function* binarySearch(values, target) {
  let left = 0;
  let right = values.length - 1;
  let checks = 0;

  const frame = (mid, msg, extra) =>
    ({ values, left, right, mid, target, found: -1, checks, msg, ...extra });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    checks++;
    yield frame(mid, `Middle is index ${mid}, value ${values[mid]}. Compare with target ${target}`);

    if (values[mid] === target) {
      yield frame(mid, `${values[mid]} = ${target} → found at index ${mid}`, { found: mid, finished: true });
      return;
    }
    if (values[mid] < target) {
      left = mid + 1;
      yield frame(mid, `${values[mid]} < ${target} → target must be to the right; discard the left half`);
    } else {
      right = mid - 1;
      yield frame(mid, `${values[mid]} > ${target} → target must be to the left; discard the right half`);
    }
  }
  yield frame(-1, `Search space is empty → ${target} is not in the array`, { finished: true });
}
