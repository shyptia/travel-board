export const setItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting localStorage item", error);
  }
};

export const getItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error("Error getting localStorage item", error);
    return null;
  }
};

export const findItem = <T>(key: string, predicate: (item: T) => boolean): T | null => {
  const items: T[] = getItem<T[]>(key) || [];
  return items.find(predicate) || null;
};
