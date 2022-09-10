import React from "react";
import "./styles/App.css";
import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar maxWidth="md" />
    </div>
  );
}

export default App;
