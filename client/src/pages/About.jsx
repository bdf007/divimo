import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import AboutUploader from "../components/aboutUploader";
// import ColorfulTitle from "../components/getRandomColor";
import RandomShadow from "../components/getRandomShadowLetter";

const About = () => {
  const { user } = useContext(UserContext);
  const [activeAbout, setActiveAbout] = useState("");

  const getAboutActive = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/activeAbout`)
      .then((response) => {
        setActiveAbout(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching active about:",
          error.response || error.message
        );
      });
  };

  useEffect(() => {
    getAboutActive();
  }, []);

  // Fonction pour rafraîchir l'about actif après modification
  const refreshActiveAbout = () => {
    getAboutActive();
  };

  const renderUserContent = () =>
    !activeAbout ? (
      <div>
        <div className="text-center mb-5">
          <h1>Welcome to Divimo</h1>
          <p>The website of Stained Glass and Mosaic</p>
        </div>
        <div className="form-group mb-3">
          <p>
            This website is a fullstack project using the MERN stack. The
            website is a showcase for a vitrail artist. The artist can upload,
            edit and delete his vitrails. The website is divided in two parts:
            the public part where the artist can show his vitrails and the admin
            part where the artist can manage his vitrails.
          </p>
        </div>
      </div>
    ) : (
      <div>
        <div className="text-center mb-5">
          <h1 style={{ whiteSpace: "pre-wrap" }}>
            <RandomShadow texte={activeAbout.title} />
          </h1>
        </div>

        <div className="form-group mb-3">
          <p dangerouslySetInnerHTML={{ __html: activeAbout.description }}></p>
        </div>
      </div>
    );

  const renderAdminContent = () => (
    <div className="container">
      <AboutUploader onUpdate={refreshActiveAbout} /> {/* Passe la fonction */}
      {renderUserContent()}
    </div>
  );

  return !user || user.role === "user" ? (
    <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
      {renderUserContent()}
    </div>
  ) : (
    renderAdminContent()
  );
};

export default About;
