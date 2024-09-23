import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import VitrailCaroussel from "../components/vitrailCaroussel";
import Admin from "../components/admin";
import ReviewCarousel from "../components/reviewCaroussel";

const Home = () => {
  const { user } = useContext(UserContext);

  // Définition du contenu pour les utilisateurs "normaux"
  const renderUserContent = () => (
    <div>
      <div className="text-center mb-5">
        <h1>Bienvenue sur Divimo</h1>
        <p>Le site de Vitrail et de Mosaïque</p>
        <VitrailCaroussel />
      </div>
      <div>
        <p>couou</p>
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
