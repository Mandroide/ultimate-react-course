import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import {PATHS} from "./utils/enums.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace(PATHS.HOME)}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
