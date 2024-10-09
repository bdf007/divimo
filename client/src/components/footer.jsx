import React from "react";
import SocialMediaViewer from "./socialMediaViewer";

const Footer = () => {
  return (
    <footer className="footer-bs">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="text-center">
              &copy; 2024 - <strong>DI VIMO</strong> - Tous droits réservés
            </p>
            <p className="text-center">
              <strong>D</strong>udin <strong>I</strong>ngrid -{" "}
              <strong>VI</strong>trail et <strong>MO</strong>saïque
              <SocialMediaViewer />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
