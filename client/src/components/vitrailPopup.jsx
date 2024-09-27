import React, { useState, useEffect } from "react";
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
  const [updateCarousel, setUpdateCarousel] = useState(vitrail.carousel);
  const [updateVisible, setUpdateVisible] = useState(vitrail.visible);
  const [updateQuantity, setUpdateQuantity] = useState(vitrail.quantity);
  const [updateDimension, setUpdateDimension] = useState(vitrail.dimension);
  const [listOfCategories, setListOfCategories] = useState([]);
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
          carousel: updateCarousel,
          visible: updateVisible,
          quantity: updateQuantity,
          dimension: updateDimension,
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

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => {
        setListOfCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setListOfCategories([]);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <img src={vitrail.photo} alt={vitrail.title} />
        <div className="vitrail-info">
          {editing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Empêche le rechargement de la page
                handleUpdate(); // Appelle la fonction d'update
              }}
            >
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  value={updatePrice}
                  onChange={(e) => setUpdatePrice(e.target.value)}
                />
              </div>
              <div>
                <label>Category</label>
                <select
                  value={updateCategory} // Le state "updateCategory" garde la valeur sélectionnée
                  onChange={(e) => setUpdateCategory(e.target.value)} // Met à jour la catégorie sélectionnée
                >
                  <option value="">Sélectionner une catégorie</option>{" "}
                  {/* Option par défaut */}
                  {listOfCategories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Carousel</label>
                <input
                  type="checkbox"
                  checked={updateCarousel}
                  onChange={(e) => setUpdateCarousel(e.target.checked)}
                />
              </div>
              <div>
                <label>Visible</label>
                <input
                  type="checkbox"
                  checked={updateVisible}
                  onChange={(e) => setUpdateVisible(e.target.checked)}
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={updateQuantity}
                  onChange={(e) => setUpdateQuantity(e.target.value)}
                />
              </div>
              <div>
                <label>Dimension</label>
                <input
                  type="text"
                  value={updateDimension}
                  onChange={(e) => setUpdateDimension(e.target.value)}
                />
              </div>
              {/* <label>Sold</label>
            <input
            type="number"
            value={updateSold}
            onChange={(e) => setUpdateSold(e.target.value)}
            /> */}
              <br />
              <button className="btn btn-primary" type="submit">
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2>titre: {vitrail.title}</h2>
              {!vitrail.description ? (
                <p>pas de description disponible</p>
              ) : (
                <p>description: {vitrail.description}</p>
              )}
              {!vitrail.price || vitrail.price === 0 ? (
                <p> pas de prix renseigné</p>
              ) : (
                <p>prix: {vitrail.price}€</p>
              )}
              {!vitrail.category ? (
                <p>pas de catégorie renseignée</p>
              ) : (
                <p>catégorie: {vitrail.category}</p>
              )}
              {vitrail.carousel ? (
                <p>dans le carousel</p>
              ) : (
                <p>pas dans le carousel</p>
              )}
              {!vitrail.quantity || vitrail.quantity === 0 ? (
                <p>pas de quantité disponible</p>
              ) : (
                <p>quantité disponible: {vitrail.quantity}</p>
              )}

              <p>{vitrail.dimension}</p>

              {/* <p>{vitrail.sold}</p> */}

              <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button className="btn btn-warning" onClick={onClose}>
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitrailPopup;
