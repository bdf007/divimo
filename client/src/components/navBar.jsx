import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

// API functions
import { logout } from "../api/user";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [logoutMessage, setLogoutMessage] = useState("");

  const handleLogout = async (e) => {
    e.preventDefault();
    logout()
      .then((res) => {
        setLogoutMessage(res.message); // Met à jour le message de déconnexion
        // set user to null
        setUser(null);
        // redirect to login page
        navigate("/");
      })
      .catch((err) => toast.log(err));
  };

  useEffect(() => {
    if (logoutMessage) {
      toast.success(logoutMessage); // Affiche le toast si un message est présent
      setLogoutMessage(""); // Réinitialise le message après l'affichage
    }
  }, [logoutMessage]); // Exécute cet effet lorsque logoutMessage change
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Acceuil
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/About">
                    A propos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Review">
                    Avis
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signup">
                    Créer un compte
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Se connecter
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profil">
                    Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/About">
                    A propos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Review">
                    Avis
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    déconnexion
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
