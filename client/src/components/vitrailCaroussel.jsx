import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VitrailCaroussel = () => {
  const [listOfVitrails, setListOfVitrails] = useState([]);

  useEffect(() => {
    const getListOfVitrails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/vitrails`
        );
        setListOfVitrails(res.data);
      } catch (error) {
        toast.error("Error during fetching vitrails: ", error);
      }
    };
    getListOfVitrails();
  }, []);

  if (listOfVitrails.length === 1) {
    const vitrail = listOfVitrails[0];
    return (
      <div className="vitrail-caroussel">
        <img src={vitrail.photo} alt={vitrail.title} />
        {/* <div className="vitrail-info">
          <Typography variant="h4">{vitrail.title}</Typography>
        </div> */}
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
  };

  return listOfVitrails.length === 1 ? (
    <div className="vitrail-caroussel">
      <img src={listOfVitrails[0].photo} alt={listOfVitrails[0].title} />
      {/* <div className="vitrail-info">
        <Typography variant="h4">{listOfVitrails[0].title}</Typography>
      </div> */}
    </div>
  ) : (
    <div className="vitrail-caroussel">
      <Slider {...settings}>
        {listOfVitrails.map((vitrail) => (
          <div key={vitrail._id}>
            <img src={vitrail.photo} alt={vitrail.title} />
            {/* <div className="vitrail-info">
              <Typography variant="h4">{vitrail.title}</Typography>
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VitrailCaroussel;
