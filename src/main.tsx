import React from "react";
import ReactDOM from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "./styles.css";

const isTouchDevice =
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0);

function AppRoot() {
  // Lenis owns the root scroller. iPad Safari and Chrome both provide a more
  // reliable native scroller, especially around fixed and pinned content.
  if (isTouchDevice) return <App />;

  return (
    <ReactLenis root options={{ lerp: 0.075, duration: 1.35, smoothWheel: true }}>
      <App />
    </ReactLenis>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
);
