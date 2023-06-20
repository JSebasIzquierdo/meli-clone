import React from "react";
import MeliLogo from "../../Assets/Images/meli-logo.png";
import LupaMeli from "../../Assets/Images/lupa-meli.png";
import "./Searchbar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() !== "") {
      navigate(`/items?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const returnReset = () => {
    navigate("/");
    setQuery("");
    document.title = "Meli Clone";
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img
            className="logo-img"
            src={MeliLogo}
            alt="Logo Mercadolibre"
            onClick={returnReset}
          />
        </div>
        <div className="search-bar">
          <input
            className="search-bar-input"
            placeholder="Nunca dejes de buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="search-bar-button"
            onClick={handleSearch}
          >
            <img
              className="search-bar-button-logo"
              src={LupaMeli}
              alt="Ícono Búsqueda Mercadolibre"
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Searchbar;
