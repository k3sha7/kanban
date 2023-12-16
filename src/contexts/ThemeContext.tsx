import React, { createContext, useContext, useState } from "react";

interface BoardProviderProps {
  children: React.ReactNode;
}

interface StateAttributes {
  darkMode: boolean;
  toggleMode: () => void
}

export const ThemeContext = createContext<StateAttributes|null>(null);

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  
  const toggleMode = () => setDarkMode(!darkMode)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext)
