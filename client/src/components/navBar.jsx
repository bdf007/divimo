import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
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
  const [listOfCategories, setListOfCategories] = useState([]);
  const [isSellingPlaceVisible, setIsSellingPlaceVisible] = useState(false);

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

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories/visible`)
      .then((response) => {
        setListOfCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setListOfCategories([]);
      });
  };

  const isThereSellingPlaceVisible = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sellingPlaces/isVisible`)
      .then((response) => {
        setIsSellingPlaceVisible(response.data);
      })
      .catch((error) => {
        console.error("Error fetching selling places:", error);
      });
  };

  useEffect(() => {
    getCategories();
    isThereSellingPlaceVisible();
  }, []);

  const renderCategories = () => {
    if (listOfCategories.length === 0) return null; // Ne pas afficher si aucune catégorie visible

    return (
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle btn btn-link"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Catégories
        </button>
        <ul className="nav-item dropdown-menu" aria-labelledby="navbarDropdown">
          {listOfCategories.map((category) => (
            <li key={category._id}>
              <Link className="dropdown-item" to={`/category/${category.name}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  const renderWhereToFindMe = () => {
    if (!isSellingPlaceVisible) return null; // Ne pas afficher si aucun lieu de vente visible
    return (
      <li className="nav-item">
        <Link className="nav-link" to="/SellingPlace">
          Ou me trouver
        </Link>
      </li>
    );
  };

  const renderNoUser = () => {
    return (
      <>
        {renderCategories()}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/About">
            A propos
          </Link>
        </li> */}

        {renderWhereToFindMe()}
        <li className="nav-item">
          <Link className="nav-link" to="/Contact">
            Contact
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
    );
  };

  const renderUser = () => {
    return (
      <>
        {renderCategories()}
        <li className="nav-item">
          <Link className="nav-link" to="/Profil">
            Profil
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/About">
            A propos
          </Link>
        </li> */}
        {user.role === "user" ? (
          renderWhereToFindMe()
        ) : (
          <li className="nav-item">
            <Link className="nav-link" to="/SellingPlace">
              Ou me trouver
            </Link>
          </li>
        )}
        {user.role !== "admin" && user.role !== "superadmin" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Review">
                Avis
              </Link>
            </li>
          </>
        )}
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
    );
  };

  useEffect(() => {
    if (logoutMessage) {
      toast.success(logoutMessage); // Affiche le toast si un message est présent
      setLogoutMessage(""); // Réinitialise le message après l'affichage
    }
  }, [logoutMessage]); // Exécute cet effet lorsque logoutMessage change
  return (
    <nav
      className="navbar navbar-expand-lg  navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* admin si user.role === admin ou superadmin sinon accueil*/}
          {user && (user.role === "admin" || user.role === "superadmin")
            ? "Admin"
            : "Accueil"}
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
            {!user ? renderNoUser() : renderUser()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
