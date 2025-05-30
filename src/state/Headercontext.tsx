import React, {createContext, useContext, useState} from 'react';

type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  title: 'Movie App',
  setTitle: () => {},
});

export const useHeader = () => useContext(HeaderContext);

export const HeaderProvider = ({children}: {children: React.ReactNode}) => {
  const [title, setTitle] = useState('Movie App');

  return (
    <HeaderContext.Provider value={{title, setTitle}}>
      {children}
    </HeaderContext.Provider>
  );
};
