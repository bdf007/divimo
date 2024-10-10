import React from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorfulTitle = ({ texte }) => {
  return (
    <>
      {texte.split("").map((letter, index) => (
        <span key={index} style={{ color: getRandomColor() }}>
          {letter}
        </span>
      ))}
    </>
  );
};

export default ColorfulTitle;
