import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import VitrailCaroussel from "../components/vitrailCaroussel";
import Admin from "../components/admin";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home">
      <div>
        <div>
          {(!user || (user && user.role === "user")) && (
            <div>
              <div className="text-center mb-5 ">
                <h1>Bienvenue sur Divimo</h1>
                <p>le site de Vitrail et de Mosaïque</p>
                <VitrailCaroussel />
              </div>
            </div>
          )}
          {user && (user.role === "superadmin" || user.role === "admin") && (
            <Admin />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
