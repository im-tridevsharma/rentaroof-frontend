import React from "react";

function WalletCard({
  label,
  amount,
  tagline,
  bgcolor,
  textcolor,
  onClick,
  mode,
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center rounded-md border-2 border-gray-200 px-5 py-2"
      style={{
        backgroundColor: mode === "transaction" ? "#6F9CBF" : bgcolor,
        color: mode === "transaction" ? "white" : textcolor,
        fontFamily: "Opensans-semi-bold",
        cursor: onClick && "pointer",
      }}
    >
      <p
        style={{
          color:
            bgcolor === "white"
              ? mode === "transaction"
                ? "white"
                : "#000"
              : textcolor,
        }}
      >
        {label}
      </p>
      <p className="mt-2 text-xl" style={{ fontFamily: "Opensans-bold" }}>
        {amount}
      </p>
      <p className="leading-3 text-3xs mb-5">{tagline}</p>
    </div>
  );
}

export default WalletCard;
