import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Providers } from "./app/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //By wrapping the app in providers we are establishing the global context
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
