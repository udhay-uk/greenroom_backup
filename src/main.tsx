import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LoginScreen from './pages/LoginScreen.tsx';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <StrictMode>
      {isLoggedIn ? (
        <App />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
