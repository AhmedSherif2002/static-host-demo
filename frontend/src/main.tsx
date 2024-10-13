import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import GithubButtonContextProvider from './store/githubInputContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GithubButtonContextProvider>
      <App />
    </GithubButtonContextProvider>
  </StrictMode>
);
