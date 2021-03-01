import { useCallback } from "react";

const useSessionStorage = (
  storageKey: string
): {
  getStoredData: () => any;
  setStoredData: (data: any) => void;
  deleteStoredData: () => void;
} => {
  const getStoredData = useCallback(() => {
    const data = JSON.parse(sessionStorage.getItem(storageKey)!);
    return data;
  }, []);

  const setStoredData = useCallback((data: any) => {
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }, []);

  const deleteStoredData = useCallback(() => {
    sessionStorage.removeItem(storageKey);
  }, []);

  return { getStoredData, setStoredData, deleteStoredData };
};

export default useSessionStorage;
