import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import VitrailCaroussel from "../components/vitrailCaroussel";
import Admin from "../components/admin";
import ReviewCarousel from "../components/reviewCaroussel";
import About from "../pages/About.jsx";
import ColorfulTitle from "../components/getRandomColor.jsx";
import RandomShadow from "../components/getRandomShadowLetter.jsx";

const Home = () => {
  const { user } = useContext(UserContext);

  // Définition du contenu pour les utilisateurs "normaux"
  const renderUserContent = () => (
    <div>
      <div className="text-center mb-5">
        <VitrailCaroussel />
        {user ? ( // Vérification que l'utilisateur est bien défini avant de rendre son nom
          <h1 style={{ marginTop: "20px" }}>
            <ColorfulTitle
              texte={`Bienvenue ${user.firstname} ${user.lastname} sur Di Vimo`}
            />
          </h1>
        ) : (
          <h1 style={{ marginTop: "20px" }}>
            <RandomShadow texte="Bienvenue sur DI VIMO" />
          </h1>
        )}
        <p>
          Le site de{" "}
          <strong>
            <ColorfulTitle texte="VI" />
          </strong>
          trail et de{" "}
          <strong>
            {" "}
            <ColorfulTitle texte="MO" />
          </strong>
          saïque
        </p>
      </div>
      <div className="text-center mb-5">
        <About />
      </div>
      <div className="text-center mb-5">
        <ReviewCarousel />
      </div>
    </div>
  );

  // Définition du contenu pour les administrateurs
  const renderAdminContent = () => (
    <div>
      <Admin />
    </div>
  );

  return (
    <div className="home">
      <div>
        {!user || (user && user.role === "user")
          ? renderUserContent()
          : renderAdminContent()}
      </div>
    </div>
  );
};

export default Home;
