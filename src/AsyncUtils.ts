
type Func<T> = (...args: any[]) => T;

export function debounce<T>(func: Func<T | Promise<T>>, wait: number): Func<void> {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}
