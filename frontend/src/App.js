import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuantitativeSearch from "./pages/QuantitativeSearch";
import FuzzySearch from "./pages/FuzzySearch";
import HybridSearch from "./pages/HybridSearch";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Quantitative Search
          </Link>
          <Link to="/fuzzy" style={{ marginRight: "10px" }}>
            Fuzzy/Exact Search
          </Link>
          <Link to="/hybrid">Hybrid Search</Link>
        </nav>

        <Routes>
          <Route path="/" element={<QuantitativeSearch />} />
          <Route path="/fuzzy" element={<FuzzySearch />} />
          <Route path="/hybrid" element={<HybridSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
