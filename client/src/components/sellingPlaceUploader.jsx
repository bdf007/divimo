import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import MyTextEditor from "./myTextEditor";

const SellingPlaceUploader = ({ onUpdate }) => {
  const { user } = useContext(UserContext);
  const [listOfSellingPlaces, setListOfSellingPlaces] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [activeSellingPlace, setActiveSellingPlace] = useState(false);
  const [editingSellingPlaceId, setEditingSellingPlaceId] = useState(null);
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [privateCalendar, setPrivateCalendar] = useState(false);
  const [color, setColor] = useState("");

  const getSellingPlaces = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sellingPlaces`)
      .then((response) => {
        setListOfSellingPlaces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching selling place:", error);
        setListOfSellingPlaces([]);
      });
  };

  const renderSellingPlaces = () => {
    return (
      <div className="row">
        {listOfSellingPlaces.map((sellingPlace) => (
          <div className="col-md-6 col-lg-4 mb-4" key={sellingPlace._id}>
            <div className="card h-100">
              <div
                className="card-body"
                style={{ backgroundColor: sellingPlace.color }}
              >
                <h5
                  className="card-name"
                  dangerouslySetInnerHTML={{ __html: sellingPlace.name }}
                ></h5>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: sellingPlace.description }}
                ></p>
                <p>
                  visible:{" "}
                  <span
                    style={{ color: sellingPlace.visible ? "blue" : "red" }}
                  >
                    {sellingPlace.visible.toString() === "true" ? "oui" : "non"}
                  </span>
                </p>
                <p>du: {formatDateForDisplay(sellingPlace.dateFrom)}</p>
                <p>au: {formatDateForDisplay(sellingPlace.dateTo)}</p>
                <br />
                <p>
                  actif:{" "}
                  <span
                    style={{
                      color: sellingPlace.activeSellingPlace ? "blue" : "red",
                    }}
                  >
                    {sellingPlace.activeSellingPlace.toString() === "true"
                      ? "oui"
                      : "non"}
                  </span>
                </p>
                <p>
                  privé:{" "}
                  <span
                    style={{
                      color: sellingPlace.privateCalendar ? "blue" : "red",
                    }}
                  >
                    {sellingPlace.privateCalendar.toString() === "true"
                      ? "oui"
                      : "non"}
                  </span>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => loadSellingPlaceForEditing(sellingPlace)}
                >
                  Mettre à jour
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSellingPlace(sellingPlace._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const formatDateForDisplay = (date) => {
    if (!date) return ""; // Si la date est vide ou invalide, retourner une chaîne vide
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Ajoute un 0 si nécessaire pour avoir le format MM
    const day = ("0" + d.getDate()).slice(-2); // Ajoute un 0 si nécessaire pour avoir le format DD
    return `${day}-${month}-${d.getFullYear()}`; // Retourner le format DD-MM-YYYY pour l'affichage général
  };

  const formatDateForInput = (date) => {
    if (!date) return ""; // Si la date est vide ou invalide, retourner une chaîne vide
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Ajoute un 0 si nécessaire pour avoir le format MM
    const day = ("0" + d.getDate()).slice(-2); // Ajoute un 0 si nécessaire pour avoir le format DD
    return `${d.getFullYear()}-${month}-${day}`; // Retourner le format YYYY-MM-DD pour les inputs date
  };

  const loadSellingPlaceForEditing = (sellingPlace) => {
    setName(sellingPlace.name);
    setDescription(sellingPlace.description);
    setVisible(sellingPlace.visible);
    setDateFrom(formatDateForInput(sellingPlace.dateFrom));
    setDateTo(formatDateForInput(sellingPlace.dateTo));
    setActiveSellingPlace(sellingPlace.activeSellingPlace);
    setPrivateCalendar(sellingPlace.privateCalendar);
    setColor(sellingPlace.color);
    setEditingSellingPlaceId(sellingPlace._id);
    setVisibleUpload(true);
  };

  const updateSellingPlace = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/sellingPlace/update/${editingSellingPlaceId}`,
        {
          name,
          description,
          visible,
          dateFrom,
          dateTo,
          activeSellingPlace,
          privateCalendar,
          color,
        }
      )
      .then((response) => {
        toast.success("Mise à jour réussie");
        getSellingPlaces();
        resetForm();
        if (onUpdate) onUpdate();
        setVisibleUpload(false);
        setEditingSellingPlaceId(null);
      })
      .catch((error) => {
        console.error("Error updating selling place:", error);
        toast.error("Erreur lors de la mise à jour");
      });
  };

  const createSellingPlace = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/sellingPlace/create`, {
        name,
        description,
        visible,
        dateFrom,
        dateTo,
        activeSellingPlace,
        privateCalendar,
        color,
      })
      .then((response) => {
        toast.success("Création réussie");
        getSellingPlaces();
        resetForm();
        if (onUpdate) onUpdate();
      })
      .catch((error) => {
        console.error("Error creating selling place:", error);
        toast.error("Erreur lors de la création");
      });
  };

  const deleteSellingPlace = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/sellingPlace/delete/${id}`)
      .then((response) => {
        toast.success("Suppression réussie");
        getSellingPlaces();
        resetForm();
        if (onUpdate) onUpdate();
      })
      .catch((error) => {
        console.error("Error deleting selling place:", error);
        toast.error("Erreur lors de la suppression");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSellingPlaceId) {
      updateSellingPlace();
    } else {
      createSellingPlace();
    }
    resetForm();
    getSellingPlaces();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setVisible(false);
    setDateFrom("");
    setDateTo("");
    setActiveSellingPlace(false);
    setEditingSellingPlaceId(null);
    setVisibleUpload(false);
    setPrivateCalendar(false);
  };

  useEffect(() => {
    getSellingPlaces();
  }, []);

  return (
    user &&
    (user.role === "admin" || user.role === "superadmin") && (
      <div className="container-fluid mt-5">
        {!editingSellingPlaceId && (
          <button
            className="btn btn-primary"
            onClick={() => setVisibleUpload(!visibleUpload)}
          >
            {visibleUpload
              ? "Cacher le formulaire"
              : "Ajouter un lieu de vente"}
          </button>
        )}
        {visibleUpload && (
          <>
            <h1>Selling Place uploader</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label htmlFor="description">Description</label>
                <MyTextEditor text={description} setText={setDescription} />

                <label htmlFor="visible">Visible</label>
                <input
                  type="checkbox"
                  className="form-control-checkbox"
                  id="visible"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                />
                <br />

                <label htmlFor="dateFrom">Date de début</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />

                <label htmlFor="dateTo">Date de fin</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />

                <label htmlFor="activeSellingPlace">Actif</label>
                <input
                  type="checkbox"
                  className="form-control-checkbox"
                  id="activeSellingPlace"
                  checked={activeSellingPlace}
                  onChange={(e) => setActiveSellingPlace(e.target.checked)}
                />
                <br />
                <label htmlFor="privateCalendar">Privé</label>
                <input
                  type="checkbox"
                  className="form-control-checkbox"
                  id="privateCalendar"
                  checked={privateCalendar}
                  onChange={(e) => setPrivateCalendar(e.target.checked)}
                />
                <br />
                <label htmlFor="color">Couleur</label>
                <input
                  style={{ width: "5rem" }}
                  type="color"
                  className="form-control"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  {editingSellingPlaceId ? "Mettre à jour" : "Créer"}
                </button>
                {editingSellingPlaceId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </>
        )}
        {!visibleUpload && (
          <>
            {listOfSellingPlaces.length > 0 ? (
              renderSellingPlaces()
            ) : (
              <p>Aucun lieu de vente</p>
            )}
          </>
        )}
      </div>
    )
  );
};

export default SellingPlaceUploader;
