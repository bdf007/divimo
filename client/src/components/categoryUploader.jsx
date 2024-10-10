import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryUploader = () => {
  const { user } = useContext(UserContext);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [descriptionCategory, setDescriptionCategory] = useState("");
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [visibleUpload, setVisibleUpload] = useState(false);

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

  const loadCategoryForEditing = (category) => {
    setNameCategory(category.name);
    setDescriptionCategory(category.description);
    setEditingCategoryId(category._id);
    setVisibleCategory(category.visible);
    setVisibleUpload(true);
  };

  const clearForm = () => {
    setNameCategory("");
    setDescriptionCategory("");
    setVisibleCategory(false);
    setEditingCategoryId(null);
    setVisibleUpload(false);
  };

  const createCategory = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/category/create`,
        {
          name: nameCategory,
          description: descriptionCategory,
          visible: visibleCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("Category created successfully");
        getCategories();
        clearForm();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        toast.error("Error creating category");
      });
  };

  const updateCategory = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/category/update/${editingCategoryId}`,
        {
          name: nameCategory,
          description: descriptionCategory,
          visible: visibleCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("Category updated successfully");
        getCategories();
        clearForm();
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        toast.error("Error updating category");
      });
  };

  const deleteCategory = (categoryId) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/category/delete/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("Category deleted successfully");
        getCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category");
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    user &&
    (user.role === "admin" || user.role === "superadmin") && (
      <div>
        <h1>Category Uploader</h1>
        {!editingCategoryId && (
          <button
            className="btn btn-primary"
            onClick={() => setVisibleUpload(!visibleUpload)}
          >
            {visibleUpload ? "Masquer" : "Afficher"} l'uploader
          </button>
        )}
        {visibleUpload && (
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={nameCategory}
              onChange={(event) => setNameCategory(event.target.value)}
            />
            <label>Description</label>
            <textarea
              placeholder="Description"
              className="form-control"
              value={descriptionCategory}
              onChange={(event) => setDescriptionCategory(event.target.value)}
            ></textarea>
            <label>Visible</label>
            <input
              type="checkbox"
              checked={visibleCategory}
              onChange={(event) => setVisibleCategory(event.target.checked)}
            />
            <br />

            <button
              className={`${
                editingCategoryId ? "btn btn-primary" : "btn btn-success"
              }`}
              onClick={editingCategoryId ? updateCategory : createCategory}
            >
              {editingCategoryId ? "Mettre à jour" : "Créer"}
            </button>
            {editingCategoryId && (
              <button className="btn btn-danger" onClick={clearForm}>
                Annuler
              </button>
            )}
          </div>
        )}

        <div>
          {!editingCategoryId &&
            !visibleUpload &&
            listOfCategories.map((category) => (
              <div key={category._id}>
                <h3>Nom de la catégorie: {category.name}</h3>
                <p>Description de la catégorie: {category.description}</p>
                <p>Visible: {category.visible ? "Oui" : "Non"}</p>
                <p>Nombre de vitraux: {category.count}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => loadCategoryForEditing(category)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category._id)}
                >
                  Supprimer
                </button>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default CategoryUploader;
