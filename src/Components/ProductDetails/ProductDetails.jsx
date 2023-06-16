import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.scss";

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

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-details">
      <div className="container-image-info">
        <div className="image-container">
          <img src={product.picture} alt="Producto" className="product-image" />
        </div>
        <div className="info-container">
          <div className="condition-quantity">
            <div className="condition">{`${
              product.condition === "new" ? "Nuevo" : "Usado"
            } • ${product.sold_quantity} vendidos`}</div>
          </div>

          <h1 className="title">{product.title}</h1>

          <div className="price-container-detail">
            <span className="price-detail">{`$ ${product.price.amount}`}</span>
            {product.price.decimals > 0 && (
              <span className="decimals">{product.price.decimals}</span>
            )}
          </div>

          <button className="buy-button">Comprar</button>
        </div>
      </div>

      <div className="description-container">
        <h2 className="description-title">Descripción del producto</h2>
        <p className="description-text">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
