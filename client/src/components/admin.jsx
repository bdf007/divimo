import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../api/user";
import VitrailUploader from "./vitrailUploader";
import VitrailCaroussel from "./vitrailCaroussel";
import UserManagement from "./userManagement";
import AdminReviewManagement from "./adminReviewManagement ";
import ReviewCarousel from "./reviewCaroussel";
import AboutUploader from "./aboutUploader";
import CategoryUploader from "./categoryUploader";
import ContactManagement from "./contactManagement";
import SocialMediaUploader from "./socialMediaUploader";

const Admin = () => {
  const { user, setUser } = useContext(UserContext);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [showUploader, setShowUploader] = useState(false); // État pour afficher/masquer VitrailUploader
  const [showUserManagement, setShowUserManagement] = useState(false); // État pour afficher/masquer UserManagement
  const [showReviewManagement, setShowReviewManagement] = useState(false); // État pour afficher/masquer ReviewManagement
  const [showAboutUploader, setShowAboutUploader] = useState(false); // État pour afficher/masquer AboutUploader
  const [showCategoryUploader, setShowCategoryUploader] = useState(false); // État pour afficher/masquer CategoryUploader
  const [showContactManagement, setShowContactManagement] = useState(false); // État pour afficher/masquer ContactManagement
  const [showSocialMediaUploader, setShowSocialMediaUploader] = useState(false); // État pour afficher/masquer SocialMediaUploader

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout(); // Appelle la fonction logout depuis l'API
      if (res.message === "Logout success") {
        setLogoutMessage(res.message); // Met à jour le message de déconnexion
        setUser(null); // Efface l'utilisateur du contexte
        navigate("/"); // Redirige vers la page d'accueil
      } else {
        toast.error("Logout failed: ", res);
      }
    } catch (error) {
      toast.error("Error during logout: ", error);
    }
  };

  useEffect(() => {
    if (logoutMessage) {
      toast.success(logoutMessage); // Affiche le toast si un message est présent
      setLogoutMessage(""); // Réinitialise le message après l'affichage
    }
  }, [logoutMessage]); // Exécute cet effet lorsque logoutMessage change

  // Fonction pour basculer l'état d'affichage du VitrailUploader
  const toggleUploader = () => {
    setShowUploader((prev) => !prev);
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowSocialMediaUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du UserManagement
  const toggleUserManagement = () => {
    setShowUserManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowSocialMediaUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du ReviewManagement
  const toggleReviewManagement = () => {
    setShowReviewManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le Contact
    setShowSocialMediaUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du AboutUploader
  const toggleAboutUploader = () => {
    setShowAboutUploader((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowSocialMediaUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du CategoryUploader
  const toggleCategoryUploader = () => {
    setShowCategoryUploader((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowSocialMediaUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du ContactManagement
  const toggleContactManagement = () => {
    setShowContactManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowSocialMediaUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du SocialMediaUploader
  const toggleSocialMediaUploader = () => {
    setShowSocialMediaUploader((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le ContactManagement
  };

  const renderButtons = () => {
    return (
      <>
        <button
          className={`btn ${showUploader ? "btn-warning" : "btn-primary"}`}
          onClick={toggleUploader}
        >
          {showUploader
            ? "masquer l'ajour de vitrail"
            : "Afficher l'ajout de vitrail"}
        </button>
        <button
          className={`btn ${
            showUserManagement ? "btn-warning" : "btn-primary"
          }`}
          onClick={toggleUserManagement}
        >
          {showUserManagement
            ? "masquer la gestion des utilisateurs"
            : "Afficher la gestion des utilisateurs"}
        </button>
        <button
          className={`btn ${
            showReviewManagement ? "btn-warning" : "btn-primary"
          }`}
          onClick={toggleReviewManagement}
        >
          {showReviewManagement
            ? "masquer la gestion des avis"
            : "Afficher la gestion des avis"}
        </button>
        <button
          className={`btn ${showAboutUploader ? "btn-warning" : "btn-primary"}`}
          onClick={toggleAboutUploader}
        >
          {showAboutUploader
            ? "masquer l'ajout de la section À propos"
            : "Afficher l'ajout de la section À propos"}
        </button>
        <button
          className={`btn ${
            showCategoryUploader ? "btn-warning" : "btn-primary"
          }`}
          onClick={toggleCategoryUploader}
        >
          {showCategoryUploader
            ? "masquer l'ajout de catégorie"
            : "Afficher l'ajout de catégorie"}
        </button>
        <button
          className={`btn ${
            showContactManagement ? "btn-warning" : "btn-primary"
          }`}
          onClick={toggleContactManagement}
        >
          {showContactManagement
            ? "masquer la gestion des messages"
            : "Afficher la gestion des messages"}
        </button>
        <button
          className={`btn ${
            showSocialMediaUploader ? "btn-warning" : "btn-primary"
          }`}
          onClick={toggleSocialMediaUploader}
        >
          {showSocialMediaUploader
            ? "masquer l'ajout de médias sociaux"
            : "Afficher l'ajout de médias sociaux"}
        </button>
      </>
    );
  };

  const rendervitrailUploader = () => {
    return (
      <>
        {showUploader && (
          <div className="uploader-container">
            <VitrailCaroussel />
            <VitrailUploader />
          </div>
        )}
      </>
    );
  };

  const renderUserManagement = () => {
    return <>{showUserManagement && <UserManagement />}</>;
  };

  const renderReviewManagement = () => {
    return (
      <>
        {showReviewManagement && (
          <div className="uploader-container">
            <ReviewCarousel />
            <AdminReviewManagement />
          </div>
        )}
      </>
    );
  };

  const renderAboutUploader = () => {
    return <>{showAboutUploader && <AboutUploader />}</>;
  };

  const renderCategoryUploader = () => {
    return <>{showCategoryUploader && <CategoryUploader />}</>;
  };

  const renderContactManagement = () => {
    return <>{showContactManagement && <ContactManagement />}</>;
  };

  const renderSocialMediaUploader = () => {
    return <>{showSocialMediaUploader && <SocialMediaUploader />}</>;
  };

  return (
    <div className="container-fluid mt-5">
      <h4 className="text-center">
        Welcome, {user.username}
        <span> </span>
        Role: {user.role}
      </h4>
      <h1 className="text-center">Admin Panel</h1>
      <div className="row">
        {/* Section des boutons */}
        <div
          className="col-md-3 col-12 mb-3"
          style={{ paddingLeft: "2rem", paddingRight: "5rem" }}
        >
          <div className="d-flex flex-column">{renderButtons()}</div>
        </div>

        {/* Section de contenu */}
        <div className="col-md-9 col-12" style={{ paddingRight: "5rem" }}>
          <div className="content">
            {/* Affichez le composant approprié en fonction de l'état */}
            {renderUserManagement()}
            {renderCategoryUploader()}
            {rendervitrailUploader()}
            {renderAboutUploader()}
            {renderReviewManagement()}
            {renderContactManagement()}
            {renderSocialMediaUploader()}
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
