import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const AboutUploader = ({ onUpdate }) => {
  // Récupère la prop onUpdate
  const [listOfAbouts, setListOfAbouts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [activeAbout, setActiveAbout] = useState(false);
  const [editingAboutId, setEditingAboutId] = useState(null);

  const { user } = useContext(UserContext);

  const getAbouts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/abouts`)
      .then((response) => {
        setListOfAbouts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
        setListOfAbouts([]);
      });
  };

  const loadAboutForEditing = (about) => {
    setTitle(about.title);
    setDescription(about.description);
    setPhoto(about.photo);
    setActiveAbout(about.activeAbout);
    setEditingAboutId(about._id);
  };

  const updateAbout = async (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/about/update/${id}`, {
        title,
        description,
        photo,
        activeAbout,
      })
      .then(() => {
        toast.success("About updated");
        setEditingAboutId(null);
        getAbouts();
        resetForm();
        if (onUpdate) onUpdate(); // Appelle la fonction onUpdate après la mise à jour
      })
      .catch((error) => {
        console.error("Error updating about:", error);
        toast.error("Failed to update about");
      });
  };

  const createAbout = async () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/about/create`, {
        title,
        description,
        photo,
        activeAbout,
      })
      .then(() => {
        toast.success("About created");
        getAbouts();
        resetForm();
        if (onUpdate) onUpdate(); // Appelle la fonction onUpdate après la création
      })
      .catch((error) => {
        console.error("Error creating about:", error);
        toast.error("Failed to create about");
      });
  };

  const deleteAbout = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/about/delete/${id}`)
      .then(() => {
        toast.success("About deleted");
        getAbouts();
        resetForm();
        if (onUpdate) onUpdate(); // Appelle la fonction onUpdate après la suppression
      })
      .catch((error) => {
        console.error("Error deleting about:", error);
        toast.error("Failed to delete about");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingAboutId) {
      updateAbout(editingAboutId);
    } else {
      createAbout();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPhoto("");
    setActiveAbout(false);
    setEditingAboutId(null);
  };

  useEffect(() => {
    getAbouts();
  }, []);

  return (
    user &&
    (user.role === "admin" || user.role === "superadmin") && (
      <div className="about-uploader">
        <h2>About uploader</h2>
        <div>
          <h3>List of abouts</h3>
          {listOfAbouts.length === 0 ? (
            <p>No abouts found</p>
          ) : (
            <ul>
              {listOfAbouts.map((about) => (
                <li key={about._id}>
                  {about.title} - {about.description} - {about.photo} -{" "}
                  <span style={{ color: about.activeAbout ? "blue" : "red" }}>
                    {about.activeAbout.toString()}
                  </span>
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={() => loadAboutForEditing(about)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAbout(about._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="photo">Photo</label>
            <input
              type="text"
              className="form-control"
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />

            <label htmlFor="activeAbout">Active About</label>
            <input
              type="checkbox"
              className="form-control"
              id="activeAbout"
              checked={activeAbout}
              onChange={(e) => setActiveAbout(e.target.checked)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingAboutId ? "Update" : "Upload"}
          </button>
          {editingAboutId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    )
  );
};

export default AboutUploader;
