type Func<TInput extends unknown[], TOutput> = (...args: TInput) => TOutput;

export function debounce<T extends Func<unknown[], void>>(
  func: T,
  wait: number,
): Func<Parameters<T>, void> {
  let lastRun = 0;
  return (...args: Parameters<T>): void => {
    const now = Date.now();
    if (now > lastRun + wait) {
      lastRun = now;
      func(...args);
    }
  };
}
