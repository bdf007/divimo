import React from "react";

const SellingPlacePopup = ({ sellingPlace, onClose }) => {
  // fonction pour gérer le clic en dehors de la popup
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDateForDisplay = (date) => {
    if (!date) return ""; // Si la date est vide ou invalide, retourner une chaîne vide
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Ajoute un 0 si nécessaire pour avoir le format MM
    const day = ("0" + d.getDate()).slice(-2); // Ajoute un 0 si nécessaire pour avoir le format DD
    return `${day}-${month}-${d.getFullYear()}`; // Retourner le format DD-MM-YYYY pour l'affichage général
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h2 dangerouslySetInnerHTML={{ __html: sellingPlace.title }}></h2>
        <p dangerouslySetInnerHTML={{ __html: sellingPlace.description }}></p>
        {/* <p>visible: {sellingPlace.visible ? "oui" : "non"}</p> */}
        <p>du: {formatDateForDisplay(sellingPlace.start)}</p>
        <p>au: {formatDateForDisplay(sellingPlace.end)}</p>
        {/* <p>actif: {sellingPlace.active ? "oui" : "non"}</p> */}
      </div>
    </div>
  );
};

export default SellingPlacePopup;
