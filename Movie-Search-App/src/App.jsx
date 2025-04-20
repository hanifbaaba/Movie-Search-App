import { BrowserRoutes, Routes, Route } from "react-router-dom";
import "./index.css";
import SearchPage from "./Pages/SearchPage";

export default function App() {
  return (
    <div>
      <h1 className="title-name">Movie Search App</h1>
      <SearchPage />
    </div>
  );
}
