import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(JSON.stringify(value));

  useEffect(() => {
    let timer: any
    timer = setTimeout(() => {
      setDebouncedValue(JSON.stringify(value));
    }, delay);
    return () => clearTimeout(timer)
  });

  return JSON.parse(debouncedValue);
};
