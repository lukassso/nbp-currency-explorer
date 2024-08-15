import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DateRangeProvider } from "./context/DateRangeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DateRangeProvider>
      <App />
    </DateRangeProvider>
  </StrictMode>
);
