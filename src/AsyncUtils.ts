
type Func<TInput extends unknown[], TOutput> = (...args: TInput) => TOutput;

export function debounce<T extends Func<unknown[], void>>(func: T, wait: number): Func<Parameters<T>, void> {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => { func(...args); }, wait);
  };
}
