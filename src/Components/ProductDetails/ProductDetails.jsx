import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.scss";
import CurrencyFormat from "../Utilities/CurrencyFormat/CurrencyFormat";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/items/${id}`
        );
        setProduct(response.data.item);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const updatePageTitle = (title) => {
      document.title = title
        ? `${title} - Detalles del Producto`
        : "Detalles del Producto";
    };

    updatePageTitle(product ? product.title : null);
  }, [product]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-search">
      <div className="breadcrumb">
        {product?.breadcrumb?.map((category, index) => (
          <React.Fragment key={index}>
            <Link to={`/category/${category}`} className="breadcrumb-link">
              <p className="breadcrumb-text">{category}</p>
            </Link>
            {index !== product.breadcrumb.length - 1 && (
              <span className="breadcrumb-separator"> | </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="container-details">
        <div className="container-image-info">
          <div className="image-container">
            <img
              src={product.picture}
              alt={product.title}
              className="product-image"
            />
          </div>
          <div className="info-container">
            <div className="condition-quantity">
              <div className="condition">{`${
                product.condition === "new" ? "Nuevo" : "Usado"
              } • ${product.sold_quantity} vendidos`}</div>
            </div>

            <h1 className="title">{product.title}</h1>

            <div className="price-container-detail">
              <CurrencyFormat
                value={product.price.amount}
                className={"price-detail"}
                minfractionDigits={2}
                maxfractionDigits={2}
              />
            </div>

            <button className="buy-button">Comprar</button>
          </div>
        </div>

        <div className="description-container">
          <h2 className="description-title">Descripción del producto</h2>
          <p className="description-text">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
