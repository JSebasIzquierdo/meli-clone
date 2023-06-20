import React from "react";
import "./CurrencyFormat.scss";

const CurrencyFormat = ({
  value,
  className,
  minfractionDigits,
  maxfractionDigits,
}) => {
  const formattedValue = value.toLocaleString("es", {
    style: "decimal",
    minimumFractionDigits: minfractionDigits,
    maximumFractionDigits: maxfractionDigits,
  });

  return (
    <span
      title={formattedValue}
      aria-label={formattedValue}
      role="text"
      className={className}
    >
      {`$ ${formattedValue}`}
    </span>
  );
};

export default CurrencyFormat;
