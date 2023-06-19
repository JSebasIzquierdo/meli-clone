import React from "react";
import "./searchresult.scss";
import { Link } from "react-router-dom";

const SearchResult = ({ results }) => {
  return (
    <div className="container-search">
      <div className="breadcrumb">
        {results?.categories?.map((category, index) => (
          <React.Fragment key={index}>
            <Link to={`/category/${category}`} className="breadcrumb-link">
              <p className="breadcrumb-text">{category}</p>
            </Link>
            {index !== category.length - 1 && (
              <span className="breadcrumb-separator">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="container-products">
        {results?.items?.map((product) => (
          <Link
            to={`/items/${product.id}`}
            className="product-link"
            key={product.id}
          >
            <div className="product-result" id={product.id}>
              <div className="product-result-thumbnail">
                <img
                  alt={product.title}
                  className="thumbnail-product"
                  src={product.picture}
                />
              </div>
              <div className="container-prices-name">
                <div className="container-prices">
                  <div className="prices-1">
                    <p className="price">$ {product.price.amount}</p>
                  </div>
                  <div className="prices-2">
                    <p className="etc-price">Capital Federal</p>
                  </div>
                </div>
                <div className="container-name">
                  <p className="name-product">{product.title}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
