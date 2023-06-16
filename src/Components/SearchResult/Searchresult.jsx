import React from "react";
import "./searchresult.scss";
import { Link } from "react-router-dom";

const Searchresult = ({ results }) => {
  return (
    <div className="container-search">
      <div className="breadcrumb">
        {results?.categories?.map((categories, index) => (
          <p className="breadcrumb-text">
            {categories}
            {index !== categories.length - 1 && " | "}
          </p>
        ))}
      </div>
      <div className="container-products">
        {results?.items?.map((products) => (
          <Link to={`/items/${products.id}`} className="product-link">
            <div className="product-result" id={products.id}>
              <div className="product-result-thumbnail">
                <img
                  alt="Imagen miniatura del producto"
                  className="thumbnail-product"
                  src={products.picture}
                />
              </div>
              <div className="container-prices-name">
                <div className="container-prices">
                  <div className="prices-1">
                    <p className="price">$ {products.price.amount}</p>
                  </div>
                  <div className="prices-2">
                    <p className="etc-price">Capital Federal</p>
                  </div>
                </div>
                <div className="container-name">
                  <p className="name-product">{products.title}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searchresult;
