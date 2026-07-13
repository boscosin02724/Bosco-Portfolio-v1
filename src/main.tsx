import React from "react";
import ReactDOM from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.35,
        smoothWheel: true,
        // Let iPadOS own native vertical touch scrolling. Lenis smoothing on
        // touch devices can fight Safari/Chrome rubber-banding and overscroll.
        syncTouch: false,
        touchMultiplier: 1,
      }}
    >
      <App />
    </ReactLenis>
  </React.StrictMode>,
);
