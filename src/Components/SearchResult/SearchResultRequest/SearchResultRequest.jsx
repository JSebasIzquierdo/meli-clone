import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Searchresult from "../Searchresult";

const SearchResultRequest = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        //const queryWithPlus = searchQuery.replace(/\s+/g, "+");

        const response = await axios.get(
          `http://localhost:3001/api/items?q=${searchQuery}`
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

  return <div>{results && <Searchresult results={results} />}</div>;
};

export default SearchResultRequest;
