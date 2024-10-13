import { ReactNode, useState } from 'react';
import { githubButtonContext } from './githubButtonContext';
import React from 'react';

const GithubButtonContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [enabled, setIsEnabled] = useState<boolean>(false);
  return (
    <githubButtonContext.Provider value={{ enabled, setIsEnabled }}>
      {children}
    </githubButtonContext.Provider>
  );
};

export default GithubButtonContextProvider;
