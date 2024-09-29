import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import PublicVitrailPopup from "./publicVitrailPopup";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VitrailCaroussel = () => {
  const [listOfVitrails, setListOfVitrails] = useState([]);
  const [selectedVitrail, setSelectedVitrail] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const openVitrailPopup = async (vitrailId) => {
    try {
      vitrailId = vitrailId._id;
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vitrail/${vitrailId}`
      );
      setSelectedVitrail(res.data);
      setShowPopup(true);
    } catch (error) {
      toast.error("Error during fetching vitrail: ", error);
    }
  };

  const closeVitrailPopup = () => {
    setSelectedVitrail(null);
    setShowPopup(false);
  };
  const getListOfVitrails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vitrail/carouselRandom`
      );
      setListOfVitrails(res.data);
    } catch (error) {
      toast.error(`Error during fetching vitrails: ${error.message}`);
    }
  };

  useEffect(() => {
    getListOfVitrails();
  }, []);

  if (listOfVitrails.length === 1) {
    const vitrail = listOfVitrails[0];
    return (
      <div className="vitrail-caroussel">
        <img src={vitrail.photo} alt={vitrail.title} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768, // Taille d'écran pour le mobile
        settings: {
          slidesToShow: 1, // Nombre de diapositives à afficher
          slidesToScroll: 1, // Nombre de diapositives à faire défiler
          dots: false, // Affiche les points sur mobile
          arrows: false, // Affiche les flèches sur mobile
          // the image take the full heigth of the caroussel
          // adaptiveHeight: true,
        },
      },
    ],
  };

  return listOfVitrails.length === 1 ? (
    <div className="vitrail-caroussel">
      <img src={listOfVitrails[0].photo} alt={listOfVitrails[0].title} />
    </div>
  ) : (
    <div className="vitrail-caroussel">
      <Slider {...settings}>
        {listOfVitrails.map((vitrail) => (
          <div key={vitrail._id}>
            <img
              src={vitrail.photo}
              alt={vitrail.title}
              onClick={() => openVitrailPopup(vitrail)}
            />
          </div>
        ))}
      </Slider>
      {showPopup && selectedVitrail && (
        <PublicVitrailPopup
          vitrail={selectedVitrail}
          onClose={closeVitrailPopup}
        />
      )}
    </div>
  );
};

export default VitrailCaroussel;
