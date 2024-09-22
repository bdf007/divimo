import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../api/user";
import VitrailUploader from "./vitrailUploader";
import VitrailCaroussel from "./vitrailCaroussel";
import UserManagement from "./userManagement";

const Admin = () => {
  const { user, setUser } = useContext(UserContext);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [showUploader, setShowUploader] = useState(false); // État pour afficher/masquer VitrailUploader
  const [showUserManagement, setShowUserManagement] = useState(false); // État pour afficher/masquer UserManagement
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
  };

  // Fonction pour basculer l'état d'affichage du UserManagement
  const toggleUserManagement = () => {
    setShowUserManagement((prev) => !prev);
    setShowUploader(false); // Masque le VitrailUploader
  };

  return (
    <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
      <div className="form-group mb-3">
        <h4>
          Welcome, {user.username}
          <span> </span>
          Role: {user.role}
        </h4>

        {/* Bouton pour afficher ou masquer le VitrailUploader */}
        <button className="btn btn-primary" onClick={toggleUploader}>
          {showUploader
            ? "masquer l'ajour de vitrail"
            : "Afficher l'ajout de vitrail"}
        </button>
        {/* Bouton pour afficher ou masquer le UserManagement */}
        <button className="btn btn-primary ms-3" onClick={toggleUserManagement}>
          {showUserManagement
            ? "masquer la gestion des utilisateurs"
            : "Afficher la gestion des utilisateurs"}
        </button>

        {/* Conditionnellement afficher le VitrailUploader */}
        {showUploader && (
          <div className="uploader-container">
            <VitrailCaroussel />
            <VitrailUploader />
          </div>
        )}

        {/* Conditionnellement afficher le UserManagement */}
        {showUserManagement && <UserManagement />}
      </div>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Admin;
