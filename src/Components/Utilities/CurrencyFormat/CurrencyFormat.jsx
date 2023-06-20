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

  const [integerPart, decimalPart] = formattedValue.split(",");

  return (
    <span
      title={formattedValue}
      aria-label={formattedValue}
      role="text"
      className={className}
    >
      <span className="integer">{`$ ${integerPart}`}</span>
      {decimalPart && <span className="decimal">{`.${decimalPart}`}</span>}
    </span>
  );
};

export default CurrencyFormat;
