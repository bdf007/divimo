import React from "react";

const PublicVitrailPopup = ({ vitrail, onClose }) => {
  // fonction pour gérer le clic en dehors de la popup
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <img src={vitrail.photo} alt={vitrail.title} />
        <div className="vitrail-info">
          <h2>{vitrail.title}</h2>
          {!vitrail.description ? (
            <p>contacter l'artiste pour plus d'informations</p>
          ) : (
            <p>{vitrail.description}</p>
          )}
          {vitrail.price === 0 || !vitrail.price ? (
            <p>contacter l'artiste pour le prix</p>
          ) : (
            <p>Prix: {vitrail.price} €</p>
          )}
          {vitrail.category && <p>Catégorie: {vitrail.category}</p>}
          {vitrail.quantity ? (
            <p>{vitrail.quantity} en stock</p>
          ) : (
            <p>contacter l'artiste pour la disponibilité</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicVitrailPopup;
