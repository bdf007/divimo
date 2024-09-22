import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VitrailPopup = ({ vitrail, onClose, user, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(vitrail.title);
  const [updateDescription, setUpdateDescription] = useState(
    vitrail.description
  );
  const [updatePrice, setUpdatePrice] = useState(vitrail.price);
  const [updateCategory, setUpdateCategory] = useState(vitrail.category);
  const [updateQuantity, setUpdateQuantity] = useState(vitrail.quantity);
  //   const [updateSold, setUpdateSold] = useState(vitrail.sold);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/vitrail/update/${vitrail._id}`,
        {
          title: updateTitle,
          description: updateDescription,
          price: updatePrice,
          category: updateCategory,
          quantity: updateQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Si le token est dans les en-têtes
          },
          withCredentials: true, // Assure l'envoi des cookies avec la requête
        }
      );
      onUpdate(res.data);
      toast.success("Vitrail updated");
      setEditing(false);
      onClose();
    } catch (error) {
      toast.error("Error during vitrail update: ", error);
    }
  };

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
        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Empêche le rechargement de la page
              handleUpdate(); // Appelle la fonction d'update
            }}
          >
            <label>Title</label>
            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              value={updatePrice}
              onChange={(e) => setUpdatePrice(e.target.value)}
            />
            <label>Category</label>
            <input
              type="text"
              value={updateCategory}
              onChange={(e) => setUpdateCategory(e.target.value)}
            />
            <label>Quantity</label>
            <input
              type="number"
              value={updateQuantity}
              onChange={(e) => setUpdateQuantity(e.target.value)}
            />
            {/* <label>Sold</label>
            <input
              type="number"
              value={updateSold}
              onChange={(e) => setUpdateSold(e.target.value)}
            /> */}
            <br />
            <button type="submit">Update</button>
          </form>
        ) : (
          <div>
            <h2>{vitrail.title}</h2>
            <p>{vitrail.description}</p>
            <p>{vitrail.price}</p>
            <p>{vitrail.category}</p>
            <p>{vitrail.quantity}</p>
            <p>{vitrail.sold}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VitrailPopup;
