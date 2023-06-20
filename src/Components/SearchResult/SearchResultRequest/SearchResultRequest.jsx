import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchResult from "../SearchResult";

const SearchResultRequest = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const encodedQuery = encodeURIComponent(searchQuery);

        const response = await axios.get(
          `http://localhost:3001/api/items?q=${encodedQuery}`
        );

        setResults(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  useEffect(() => {
    const updatePageTitle = () => {
      document.title = searchQuery
        ? `${searchQuery} | Meli Clone`
        : "Lista de Resultados";
    };

    updatePageTitle();
  }, [searchQuery]);

  return (
    <main>
      <div>{results && <SearchResult results={results} />}</div>
    </main>
  );
};

export default SearchResultRequest;
