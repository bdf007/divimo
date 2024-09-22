import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const About = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="about">
      <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="text-center mb-5 alert alert-primary">
          <label htmlFor="" className="h2">
            About
          </label>
        </div>
        {!user ? (
          <div className="form-group mb-3">
            <p>
              This website is a fullstack project using the MERN stack. The
              website is a showcase for a vitrail artist. The artist can upload,
              edit and delete his vitrails. The website is divided in two parts:
              the public part where the artist can show his vitrails and the
              admin part where the artist can manage his vitrails.
            </p>
          </div>
        ) : (
          <div className="form-group mb-3">
            <p>
              This website is a fullstack project using the MERN stack. The
              website is a showcase for a vitrail artist. The artist can upload,
              edit and delete his vitrails. The website is divided in two parts:
              the public part where the artist can show his vitrails and the
              admin part where the artist can manage his vitrails.
            </p>
            <p>
              You are logged in as <strong>{user.username}</strong> with the
              role <strong>{user.role}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default About;
