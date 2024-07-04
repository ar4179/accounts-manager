import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

export const REACT_APP_DB_URL = "https://api-accounts-manager.onrender.com/";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App />);
