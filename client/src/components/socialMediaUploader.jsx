import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const SocialMediaUploader = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [listOfMedias, setListOfMedias] = useState([]);
  const [editingSocialMediaId, setEditingSocialMediaId] = useState(null);
  const [visibleUpload, setVisibleUpload] = useState(false);
  const fileInputRef = useRef(null);

  const getListOfsocialMedia = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/socialMedias`
      );
      setListOfMedias(res.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des médias :", error);
    }
  };

  const loadSocialMediaForEditing = (socialMedia) => {
    setTitle(socialMedia.title);
    setDescription(socialMedia.description);
    setUrl(socialMedia.url);
    setVisible(socialMedia.visible);
    setEditingSocialMediaId(socialMedia._id);
    setVisibleUpload(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setVisible(false);
    setSelectedFile(null);
    setEditingSocialMediaId(null);
    setVisibleUpload(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadSocialMedia = async (e) => {
    e.preventDefault();
    try {
      const fileReader = new FileReader();
      const base64Data = await new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(selectedFile);
      });

      const postData = { title, description, url, visible, photo: base64Data };

      if (editingSocialMediaId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/socialMedia/update/${editingSocialMediaId}`,
          postData
        );
        toast.success("Réseau social mis à jour avec succès");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/socialMedia/create`,
          postData
        );
        toast.success("Réseau social créé avec succès");
      }

      resetForm();
      getListOfsocialMedia();
    } catch (error) {
      console.error("Erreur lors de l'upload du réseau social :", error);
      toast.error("Erreur lors de l'upload du réseau social :", error);
    }
  };

  const deleteSocialMedia = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/socialMedia/delete/${id}`
      );
      toast.success("Réseau social supprimé avec succès");
      getListOfsocialMedia();
    } catch (error) {
      toast.error("Erreur lors de la suppression du réseau social :", error);
    }
  };

  useEffect(() => {
    getListOfsocialMedia();
  }, []);

  return (
    user &&
    (user.role === "admin" || user.role === "superadmin") && (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setVisibleUpload(!visibleUpload)}
        >
          {visibleUpload ? "Masquer l'uploader" : "Afficher l'uploader"}
        </button>
        {visibleUpload && (
          <form onSubmit={handleUploadSocialMedia}>
            <h1>
              {editingSocialMediaId ? "Modifier" : "Uploader"} un réseau social
            </h1>
            <div className="form-group">
              <label htmlFor="file">Photo</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                ref={fileInputRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="visible">Visible</label>
              <input
                type="checkbox"
                id="visible"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editingSocialMediaId ? "Mettre à jour" : "Créer"}
            </button>
            {editingSocialMediaId && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={resetForm}
              >
                Annuler
              </button>
            )}
          </form>
        )}
        {!visibleUpload && (
          <>
            <h2>Liste des publications</h2>
            {listOfMedias.length === 0 ? (
              <h1>Chargement...</h1>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                {listOfMedias.map((socialMedia) => (
                  <div
                    key={socialMedia._id}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <h3>{socialMedia.title}</h3>
                    {socialMedia.photo && (
                      <img
                        src={socialMedia.photo}
                        alt={socialMedia.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() => window.open(socialMedia.url)}
                      />
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={() => loadSocialMediaForEditing(socialMedia)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteSocialMedia(socialMedia._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    )
  );
};

export default SocialMediaUploader;
