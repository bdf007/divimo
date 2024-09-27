import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PublicVitrailPopup from "./publicVitrailPopup";

const Category = ({ category }) => {
  const [listOfVitrailsByCategory, setListOfVitrailsByCategory] = useState([]);
  const [selectedVitrail, setSelectedVitrail] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

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

  const openVitrailPopup = async (vitrailId) => {
    try {
      vitrailId = vitrailId._id;
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vitrail/${vitrailId}`
      );
      setSelectedVitrail(res.data);
      setIsOpenPopup(true);
    } catch (error) {
      toast.error("Error during fetching vitrail: ", error);
    }
  };

  const closeVitrailPopup = () => {
    setSelectedVitrail(null);
    setIsOpenPopup(false);
  };

  useEffect(() => {
    getVitrailsByCategory();
  }, [category]);

  return (
    <div className="home">
      <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5 ">
        <div className="text-center mb-5">
          <h1>{category}</h1>
          <p>
            Contenu de la catégorie:{" "}
            {!listOfVitrailsByCategory.length ||
            !listOfVitrailsByCategory[0].categoryDescription ? (
              <span>Non disponible</span>
            ) : (
              <span>{listOfVitrailsByCategory[0].categoryDescription}</span>
            )}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {listOfVitrailsByCategory.map((vitrail) => (
              <div
                key={vitrail._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "4px",
                }}
                className="vitrail-card"
              >
                {vitrail.photo && (
                  <img
                    src={vitrail.photo}
                    alt={vitrail.title}
                    style={{ width: "100%", height: "auto", cursor: "pointer" }} // Ajoute un curseur pour indiquer que l'image est cliquable
                    onClick={() => openVitrailPopup(vitrail)} // Ouvre le popup lors du clic sur l'image
                  />
                )}
                <p>{vitrail.title}</p>
              </div>
            ))}
          </div>
        </div>
        {isOpenPopup && selectedVitrail && (
          <PublicVitrailPopup
            vitrail={selectedVitrail}
            onClose={closeVitrailPopup}
          />
        )}
      </div>
    </div>
  );
};

export default Category;
