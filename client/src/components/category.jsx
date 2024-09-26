import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = ({ category }) => {
  const [listOfVitrailsByCategory, setListOfVitrailsByCategory] = useState([]);

  const getVitrailsByCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/vitrail/category`, {
        params: {
          category: category,
          visible: true, // Passer la catégorie comme paramètre
        },
      })
      .then((response) => {
        setListOfVitrailsByCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vitrails by category:", error);
        setListOfVitrailsByCategory([]);
      });
  };

  useEffect(() => {
    getVitrailsByCategory();
  }, [category]); // Ajoutez category comme dépendance

  return (
    <div>
      <h1>{category}</h1>
      <p>Contenu de la catégorie: {category}</p>
      <ul>
        {listOfVitrailsByCategory.map((vitrail) => (
          <li key={vitrail._id}>
            <img src={vitrail.photo} alt={vitrail.title} />
            <p>{vitrail.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
