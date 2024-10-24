import { getItem, setItem } from "@/helpers/localStorage";
import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getItem<T>(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    setItem<T>(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
