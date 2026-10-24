import { LanguageProvider } from "./i18n/LanguageProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import FacelessVideoEditorPage from "./FacelessVideoEditorPage";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <FacelessVideoEditorPage />
    </LanguageProvider>
  </React.StrictMode>
);
