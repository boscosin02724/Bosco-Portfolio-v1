import React from "react";
import ReactDOM from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactLenis root options={{ lerp: 0.075, duration: 1.35, smoothWheel: true }}>
      <App />
    </ReactLenis>
  </React.StrictMode>,
);
