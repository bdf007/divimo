import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Profil from "./pages/Profil";
import Review from "./pages/Review";
import Category from "./components/category";

// components
import NavBar from "./components/navBar";

// API functions
import { getUser } from "./api/user";

function App() {
  const [user, setUser] = useState(null);
  const [listOfCategories, setListOfCategories] = useState([]);

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => {
        setListOfCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setListOfCategories([]);
      });
  };

  useEffect(() => {
    const unsubscribe = getUser()
      .then((res) => {
        if (res.error) toast(res.error);
        else
          setUser({
            id: res._id,
            username: res.username,
            role: res.role,
            email: res.email,
            firstname: res.firstname,
            lastname: res.lastname,
          });
      })
      .catch((err) => toast(err));

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="appGlobal">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContainer />
          <NavBar />
          <Routes>
            {listOfCategories.map((category) => (
              <Route
                key={category._id}
                path={`/category/${category.name}`}
                element={<Category category={category.name} />}
              />
            ))}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/review" element={<Review />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <ToastContainer />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
