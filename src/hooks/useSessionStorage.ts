import { useState, useEffect } from "react";

const getSessionItem = <T>(key: string): T | null => {
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

const setSessionItem = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getSessionItem<T>(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [key, initialValue]);

  useEffect(() => {
    setSessionItem<T>(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
