type Func<TInput extends never[], TOutput> = (...args: TInput) => TOutput;

export function debounce<T extends Func<never[], void>>(
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
