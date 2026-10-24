import { LanguageProvider } from "./i18n/LanguageProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import AgencyVideoEditorPage from "./AgencyVideoEditorPage";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <AgencyVideoEditorPage />
    </LanguageProvider>
  </React.StrictMode>,
);
