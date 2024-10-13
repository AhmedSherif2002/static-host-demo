import { createContext } from 'react';

export const githubButtonContext = createContext<{
  enabled: boolean;
  setIsEnabled: (x: boolean) => void;
}>({
  enabled: false,
  setIsEnabled: () => {},
});
