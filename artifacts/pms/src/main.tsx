import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/forgepulse-client-react";

// Configure API base URL for the client. Set VITE_API_BASE to override.
const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
setBaseUrl(apiBase);

createRoot(document.getElementById("root")!).render(<App />);
