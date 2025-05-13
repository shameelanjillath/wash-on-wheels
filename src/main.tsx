
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeDatabase } from './utils/db/init-db';

// Initialize database when the app starts in development
if (import.meta.env.DEV) {
  console.log("Running database initialization...");
  initializeDatabase()
    .then(() => {
      console.log("Database initialization complete");
    })
    .catch((error) => {
      console.error("Database initialization failed:", error);
    });
}

createRoot(document.getElementById("root")!).render(<App />);
