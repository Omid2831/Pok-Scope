import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to "light"
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Sync theme state to localStorage and update <html> class
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
