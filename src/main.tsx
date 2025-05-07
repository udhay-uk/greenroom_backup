import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoginScreen from "./pages/LoginScreen.tsx";

const RootComponent = () => {
  const isStoredAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";
  const [isAuthenticated, setIsAuthenticated] = useState(
    isStoredAuthenticated || false
  );

  const handleSuccessfulLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <StrictMode>
      {isAuthenticated ? (
        <App />
      ) : (
        <LoginScreen onSuccessfulLogin={handleSuccessfulLogin} />
      )}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<RootComponent />);
