export const getSessionItem = <T>(key: string): T | null => {
  try {
    if (typeof window === "undefined") return null;
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error getting sessionStorage item", error);
    return null;
  }
};

export const setSessionItem = <T>(key: string, value: T): void => {
  try {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting sessionStorage item", error);
  }
};