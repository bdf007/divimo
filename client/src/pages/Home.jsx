import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { logout } from "../api/user"; // importe la fonction logout
import VitrailUploader from "../components/vitrailUploader";
import VitrailCaroussel from "../components/vitrailCaroussel";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [logoutMessage, setLogoutMessage] = useState("");
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

  return (
    <div className="home">
      <div>
        <div>
          {user ? (
            <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
              <div className="form-group mb-3">
                <label htmlFor="" className="h4">
                  Welcome, {user.username}
                </label>
                <label htmlFor="" className="h4">
                  Role: {user.role}
                </label>
                <VitrailUploader />
              </div>
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-5 ">
                <h1>Bienvenue sur Divimo</h1>
                <p>le site de Vitrail et de Mosaïque</p>
                <VitrailCaroussel />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
