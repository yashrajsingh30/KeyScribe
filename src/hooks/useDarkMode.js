import { useState, useEffect } from 'react';
export function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add('dark'); localStorage.theme = 'dark'; }
    else { root.classList.remove('dark'); localStorage.theme = 'light'; }
  }, [dark]);
  return [dark, setDark];
}