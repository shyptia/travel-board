import { getSessionItem, setSessionItem } from "@/helpers/sessionStorage";
import { useState, useEffect } from "react";

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const item = getSessionItem<T>(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          const newValue = event.newValue ? (JSON.parse(event.newValue) as T) : initialValue;
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
