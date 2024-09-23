import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Review = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const [star, setStar] = useState(0);
  const [userReview, setUserReview] = useState([]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/review/email/${user.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            const userReview = response.data[0];
            setMessage(userReview.message);
            setStar(userReview.star);
            setUserReview(userReview);
          }
        });
    }
  }, [user]);

  const handleStarClick = (starValue) => {
    setStar(starValue === star ? 0 : starValue);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/review`, {
        firstname,
        lastname,
        email,
        message,
        star,
        validation: false,
        visible: false,
      })
      .then((response) => {
        toast.success("Review submitted");
        setFirstname("");
        setLastname("");
        setEmail("");
        setMessage("");
        setStar(0);
      })
      .catch((error) => {
        // Check if error response exists
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error); // Show specific error message
        } else {
          toast.error("Failed to submit review"); // Generic error message
        }
      });
  };
  return (
    <div className="home">
      <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <h1 className="text-danger">
          {userReview._id ? "Modifier votre review" : "Laisser une review"}
        </h1>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              type="text"
              id="message"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="star">Star Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {index < star ? (
                    <StarIcon sx={{ fontSize: 24, color: "yellow" }} />
                  ) : (
                    <StarOutlineIcon sx={{ fontSize: 24 }} />
                  )}
                </span>
              ))}
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              !firstname ||
              !lastname ||
              !email ||
              !emailRegex.test(email) ||
              !message ||
              !star
            }
          >
            {userReview._id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
