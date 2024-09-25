import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryUploader = () => {
  const { user } = useContext(UserContext);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [descriptionCategory, setDescriptionCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => {
        setListOfCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setListOfCategories([]);
      });
  };

  const loadCategoryForEditing = (category) => {
    setNameCategory(category.nameCategory);
    setDescriptionCategory(category.descriptionCategory);
    setEditingCategoryId(category._id);
  };

  const clearForm = () => {
    setNameCategory("");
    setDescriptionCategory("");
    setEditingCategoryId(null);
  };

  const createCategory = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/category/create`,
        {
          name: nameCategory,
          description: descriptionCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
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
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${user.token}`,
        //   },
        // },
        // { withCredentials: true }
      )
      .then((response) => {
        toast.success("Category updated successfully");
        getCategories();
        clearForm();
      })
      .catch((error) => {
        console.log(error.message.data);
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
            Authorization: `Bearer ${user.token}`,
          },
        },
        { withCredentials: true }
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
    <div>
      <h1>Category Uploader</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={nameCategory}
          onChange={(event) => setNameCategory(event.target.value)}
        />
        <textarea
          placeholder="Description"
          value={descriptionCategory}
          onChange={(event) => setDescriptionCategory(event.target.value)}
        ></textarea>
        <button onClick={editingCategoryId ? updateCategory : createCategory}>
          {editingCategoryId ? "Update" : "Create"}
        </button>

        <div>
          {listOfCategories.map((category) => (
            <div key={category._id}>
              <h3>Nom de la catégorie: {category.name}</h3>
              <p>Description de la catégorie: {category.description}</p>
              <button onClick={() => loadCategoryForEditing(category)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryUploader;
