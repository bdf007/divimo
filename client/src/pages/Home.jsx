import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { logout } from "../api/user"; // importe la fonction logout

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
        console.error("Logout failed: ", res);
      }
    } catch (error) {
      console.error("Error during logout: ", error);
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
      <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="form-group mb-3">
          {user ? (
            <div>
              <div>
                <label htmlFor="" className="h4">
                  Welcome, {user.username}
                </label>
                <label htmlFor="" className="h4">
                  Role: {user.role}
                </label>
              </div>
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-5 alert alert-primary">
                <label htmlFor="" className="h2">
                  Welcome to the Home Page
                </label>
              </div>
              <div className="form-group mb-3">
                <Link to="/signup" className="btn btn-primary">
                  Signup
                </Link>
              </div>
              <div>
                <label htmlFor="" className="h4">
                  Please login to see your profile
                </label>
              </div>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
