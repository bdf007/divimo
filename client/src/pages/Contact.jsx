import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

// import spin from "../assets/Spin.gif";

const Contact = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [listOfContact, setListOfContact] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  // Email validation regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // useEffect(() => {
  //   // setIsLoading(false);
  //   axios.get(`${process.env.REACT_APP_API_URL}/api/contact`).then((res) => {
  //     setListOfContact(res.data);
  //   });
  // }, [listOfContact]);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleUpload = () => {
    // Validate fields
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      toast.error("Merci de remplir tous les champs.");
      return;
    }
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/contact`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        message: message,
      })
      .then((response) => {
        toast.success("Message sent");
        setIsLoading(true);
        // setListOfContact([
        //   ...listOfContact,
        //   {
        //     _id: response.data._id,
        //     firstname: firstname,
        //     lastname: lastname,
        //     email: email,
        //     message: message,
        //   },
        // ]);

        // reset the form
        setFirstname("");
        setLastname("");
        setEmail("");
        setMessage("");

        // clear the input field
        // document.getElementById("firstname").value = "";
        // document.getElementById("lastname").value = "";
        // document.getElementById("email").value = "";
        // document.getElementById("message").value = "";
      });
  };

  return (
    <div className="home">
      <div className=" row d-flex justify-content-around">
        <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5 g-2">
          <h2 className="text-danger">Contactez moi</h2>
          {!isLoading ? (
            <form
              action="https://formsubmit.co/christophemidelet650@gmail.com"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                handleUpload(); // Perform your custom form submission logic
              }}
            >
              <div className="form-group">
                <label htmlFor="firstname">Prénom*</label>
                <input
                  value={firstname}
                  name="firstname"
                  id="firstname"
                  size="small"
                  className="form-control mb-3"
                  placeholder="Prénom"
                  label="Prénom*"
                  onChange={handleFirstnameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Nom*</label>
                <input
                  value={lastname}
                  id="lastname"
                  name="lastname"
                  size="small"
                  className="form-control mb-3"
                  placeholder="Nom"
                  label="Nom*"
                  onChange={handleLastnameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  value={email}
                  id="email"
                  name="email"
                  size="small"
                  className="form-control mb-3"
                  placeholder="Email"
                  label="Email*"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message*</label>
                <textarea
                  value={message}
                  id="message"
                  name="message"
                  size="small"
                  className="form-control mb-3"
                  placeholder="Message"
                  label="Message*"
                  onChange={handleMessageChange}
                >
                  {""}
                </textarea>
                <p className="fs-6 text-muted">*: champs obligatoire</p>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={
                    !firstname ||
                    !lastname ||
                    !email ||
                    !message ||
                    !emailRegex.test(email)
                  }
                >
                  Envoyer
                </button>
              </div>
              <input type="hidden" name="_subject" value="Nouveau Contact" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://christophe-midelet.fr/Contact"
              />
            </form>
          ) : (
            <p>
              merci de patienter{" "}
              {/* <span>
                    <img
                      src={spin}
                      alt="loading"
                      className="spin"
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </span> */}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
