
type Func<T> = (...args: any[]) => T;

export function makeAsync<T>(func: Func<T | Promise<T>>): Func<Promise<T>> {
  return async (...args) => func(args);
}

export function debounce<T>(func: Func<T | Promise<T>>, wait: number): Func<void> {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}
