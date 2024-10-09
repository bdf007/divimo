import React, { useState, useEffect } from "react";
import axios from "axios";

const SocialMediaViewer = ({ images }) => {
  const [listOfMedias, setListOfMedias] = useState([]);

  useEffect(() => {
    const getListOfsocialMedia = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/socialMedias`
        );
        setListOfMedias(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des médias :", error);
      }
    };

    getListOfsocialMedia();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {listOfMedias.map((media) => (
        <div
          key={media._id}
          style={{
            flex: "1 0 auto",
            maxWidth: "150px", // Limite la taille max d'une image tout en gardant le layout flexible
          }}
        >
          <img
            src={media.photo}
            alt={media.title}
            style={{
              width: "2rem",
              height: "2rem",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => window.open(media.url)}
          />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaViewer;
