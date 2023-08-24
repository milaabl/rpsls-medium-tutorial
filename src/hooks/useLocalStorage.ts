import { useEffect, useSyncExternalStore } from 'react';

export const useLocalStorage = (
  key: string,
): [string | null, (value: string, key?: string) => void] => {
  const subscribe = (listener: () => void) => {
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  };

  const getSnapShot = (): string | null => {
    return localStorage.getItem(key);
  };

  const value = useSyncExternalStore(subscribe, getSnapShot);

  const setValue = (newValue: string, _key?: string) => {
    localStorage.setItem(_key || key, newValue);
  };

  useEffect(() => {
    if (value) {
      setValue(value, key);
    }
  }, [key]);

  return [value, setValue];
};
