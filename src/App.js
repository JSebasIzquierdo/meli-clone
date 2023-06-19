import React from "react";
import Searchbar from "./Components/SearchBar/Searchbar.jsx";
import SearchResultRequest from "./Components/SearchResult/SearchResultRequest/SearchResultRequest.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="full_body">
        <header>
          <Searchbar />
        </header>

        <main className="content">
          <Routes>
            <Route path="/items" element={<SearchResultRequest />} />
            <Route path="/items/:id" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
