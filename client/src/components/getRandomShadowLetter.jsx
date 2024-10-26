import React from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getTextShadow = () => {
  // Ajuste les décalages pour donner l'impression d'une rotation de l'ombre
  const xOffset = "0.5rem"; // Déplacement en x (plus large pour l'effet pivot)
  const yOffset = "1rem"; // Déplacement en y (plus important pour l'effet pivot)
  const blurRadius = "0.3rem"; // Flou légèrement augmenté
  const shadowColor = getRandomColor(); // Ombre avec une couleur aléatoire
  return `${xOffset} ${yOffset} ${blurRadius} ${shadowColor}`;
};

const RandomShadow = ({ texte }) => {
  return (
    <>
      {texte.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            color: "#594d4d", // Couleur fixe des lettres
            textShadow: getTextShadow(), // Ombre colorée et décalée
            // display: "inline-block", // Nécessaire pour que l'ombre s'applique correctement
          }}
        >
          {letter}
        </span>
      ))}
    </>
  );
};

export default RandomShadow;
