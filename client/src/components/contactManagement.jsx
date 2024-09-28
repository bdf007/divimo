import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const ContactManagement = () => {
  const { user } = useContext(UserContext);
  const [listOfContact, setListOfContact] = useState([]);

  useEffect(() => {
    // setIsLoading(false);
    axios.get(`${process.env.REACT_APP_API_URL}/api/contact`).then((res) => {
      setListOfContact(res.data);
    });
  }, [listOfContact]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/contact/${id}`)
      .then(() => {
        toast.success("Message deleted");
        setListOfContact(
          listOfContact.filter((value) => {
            return value._id !== id;
          })
        );
      });
  };

  return (
    <div>
      {user && (user.role === "admin" || user.role === "superadmin") && (
        <div>
          {listOfContact.length === 0 && <h1>No message</h1>}
          {listOfContact.map((value) => {
            return (
              <div key={value._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    {value.firstname} {value.lastname}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {value.email}
                  </h6>
                  <p className="card-text">
                    <small>
                      {new Date(value.date).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(value.date).toLocaleTimeString("fr-FR")}
                    </small>
                  </p>
                  <p className="card-text">{value.message}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(value._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
