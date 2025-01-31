import { getItem, setItem } from "@/helpers/localStorage";
import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const item = getItem<T>(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  }, [key, initialValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setItem<T>(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
