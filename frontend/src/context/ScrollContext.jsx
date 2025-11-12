/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider = ({ children }) => {
  const [scrollTarget, setScrollTarget] = useState(null);

  const scrollToSection = (sectionId) => {
    setScrollTarget(sectionId);
  };

  return (
    <ScrollContext.Provider value={{ scrollTarget, scrollToSection, setScrollTarget }}>
      {children}
    </ScrollContext.Provider>
  );
};