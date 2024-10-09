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
    setShowAboutUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du UserManagement
  const toggleUserManagement = () => {
    setShowUserManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowAboutUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du ReviewManagement
  const toggleReviewManagement = () => {
    setShowReviewManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le Contact
    setShowAboutUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du AboutUploader
  const toggleAboutUploader = () => {
    setShowAboutUploader((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowAboutUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du CategoryUploader
  const toggleCategoryUploader = () => {
    setShowCategoryUploader((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowContactManagement(false); // Masque le ContactManagement
    setShowAboutUploader(false); // Masque le AboutUploader
  };

  // Fonction pour basculer l'état d'affichage du ContactManagement
  const toggleContactManagement = () => {
    setShowContactManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
    setShowUserManagement(false); // Masque le UserManagement
    setShowReviewManagement(false); // Masque le ReviewManagement
    setShowAboutUploader(false); // Masque le AboutUploader
    setShowCategoryUploader(false); // Masque le CategoryUploader
    setShowAboutUploader(false); // Masque le AboutUploader
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

  const rendervitrailUploader = () => {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleUploader}>
          {showUploader
            ? "masquer l'ajour de vitrail"
            : "Afficher l'ajout de vitrail"}
        </button>
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
    return (
      <>
        <button className="btn btn-primary" onClick={toggleUserManagement}>
          {showUserManagement
            ? "masquer la gestion des utilisateurs"
            : "Afficher la gestion des utilisateurs"}
        </button>
        {showUserManagement && <UserManagement />}
      </>
    );
  };

  const renderReviewManagement = () => {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleReviewManagement}>
          {showReviewManagement
            ? "masquer la gestion des avis"
            : "Afficher la gestion des avis"}
        </button>
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
    return (
      <>
        <button className="btn btn-primary" onClick={toggleAboutUploader}>
          {showAboutUploader
            ? "masquer l'ajout de la section À propos"
            : "Afficher l'ajout de la section À propos"}
        </button>
        {showAboutUploader && <AboutUploader />}
      </>
    );
  };

  const renderCategoryUploader = () => {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleCategoryUploader}>
          {showCategoryUploader
            ? "masquer l'ajout de catégorie"
            : "Afficher l'ajout de catégorie"}
        </button>
        {showCategoryUploader && <CategoryUploader />}
      </>
    );
  };

  const renderContactManagement = () => {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleContactManagement}>
          {showContactManagement
            ? "masquer la gestion des messages"
            : "Afficher la gestion des messages"}
        </button>
        {showContactManagement && <ContactManagement />}
      </>
    );
  };

  const renderSocialMediaUploader = () => {
    return (
      <>
        <button className="btn btn-primary" onClick={toggleSocialMediaUploader}>
          {showSocialMediaUploader
            ? "masquer l'ajout de médias sociaux"
            : "Afficher l'ajout de médias sociaux"}
        </button>
        {showSocialMediaUploader && <SocialMediaUploader />}
      </>
    );
  };

  return (
    <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5 ">
      <div className="text-center mb-5 ">
        <h4>
          Welcome, {user.username}
          <span> </span>
          Role: {user.role}
        </h4>
        {renderUserManagement()}
        {renderCategoryUploader()}
        {rendervitrailUploader()}
        {renderAboutUploader()}
        {renderReviewManagement()}
        {renderContactManagement()}
        {renderSocialMediaUploader()}
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
