import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import VitrailPopup from "./vitrailPopup";

const VitrailUploader = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [carousel, setCarousel] = useState(false);
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [dimension, setDimension] = useState("");
  // const [shipping, setShipping] = useState(false);
  // const [sold, setSold] = useState(0);
  const [otherCategory, setOtherCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [listOfVitrails, setListOfVitrails] = useState([]);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [selectedVitrail, setSelectedVitrail] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const fileInputRef = useRef(null); // Création de la référence

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

  const openVitrailPopup = async (vitrailId) => {
    try {
      vitrailId = vitrailId._id;
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vitrail/${vitrailId}`
      );
      setSelectedVitrail(res.data);
      setIsOpenPopup(true);
    } catch (error) {
      toast.error("Error during fetching vitrail: ", error);
    }
  };

  const closeVitrailPopup = () => {
    setSelectedVitrail(null);
    setIsOpenPopup(false);
  };

  const getListOfCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/categories`
      );
      setListOfCategories(res.data);
    } catch (error) {
      toast.error("Error during fetching categories: ", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setCarousel(false);
    setVisible(false);
    setQuantity(0);
    setDimension("");
    // setShipping(false);
    // setSold(0);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Réinitialiser la valeur du champ fichier
    }
  };

  const handleUploadVitrail = async (e) => {
    e.preventDefault();
    try {
      const fileReader = new FileReader();

      const base64Data = await new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(selectedFile);
      });

      const imageVitrail = new Image();
      imageVitrail.src = base64Data;

      await new Promise((resolve, reject) => {
        imageVitrail.onload = resolve;
        imageVitrail.onerror = reject;
      });

      // set the maximum width and height for the image
      const maxWidth = 800;
      const maxHeight = 600;

      let newWidth = imageVitrail.width;
      let newHeight = imageVitrail.height;

      // resize the image while maintaining the aspect ratio
      if (imageVitrail.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = Math.floor(
          (imageVitrail.height * maxWidth) / imageVitrail.width
        );
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = Math.floor(
          (imageVitrail.width * maxHeight) / imageVitrail.height
        );
      }

      // create a canvas element to draw the resized image
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageVitrail, 0, 0, newWidth, newHeight);

      // convert the canvas content to base64 with WebP format
      const resizedBase64Data = canvas.toDataURL("image/webp");

      const vitrailData = {
        title,
        description,
        price,
        category: category === "Autre" ? otherCategory : category,
        carousel,
        visible,
        quantity,
        dimension,
        photo: resizedBase64Data,
        // shipping,
        // sold,
      };

      const categoryVisible = visible;
      if (otherCategory) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/category/create`,
            {
              name: otherCategory,
              description: "",
              visible: categoryVisible,
            },
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
              withCredentials: true,
            }
          )
          .then(() => {
            toast.success("Category created successfully");
          })
          .catch((error) => {
            console.error("Error creating category:", error);
            toast.error("Error creating category");
          });
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/vitrail/create`,
        vitrailData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Vitrail created successfully", res.data.message);
      resetForm();
      getListOfVitrails();
      setFormIsVisible(false);
    } catch (error) {
      toast.error("Error during vitrail creation: ", error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setCategory(selectedValue);
    if (selectedValue === "Autre") {
      setOtherCategory(""); // Réinitialiser l'input si "Autre" est sélectionné
    }
  };

  const handleOtherCategoryChange = (e) => {
    setOtherCategory(e.target.value);
  };

  const handleCarouselChange = (e) => {
    setCarousel(e.target.checked);
  };

  const handleVisibleChange = (e) => {
    setVisible(e.target.checked);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDimensionChange = (e) => {
    setDimension(e.target.value);
  };

  // const handleShippingChange = (e) => {
  //   setShipping(e.target.value);
  // };

  // const handleSoldChange = (e) => {
  //   setSold(e.target.value);
  // };

  const deleteVitrail = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/vitrail/delete/${id}`
      );
      toast.success(res.data.message);
      getListOfVitrails();
    } catch (error) {
      toast.error("Error during vitrail deletion: ", error);
    }
  };

  const renderUploadForm = () => {
    return (
      <form>
        <h1>Uploader une image</h1>
        <div className="form-group">
          <label htmlFor="file">photo</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="form-control"
            placeholer="photo"
            onChange={handleFileInputChange}
            ref={fileInputRef} // Ajout de la référence
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Titre"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            className="form-control"
            placeholder="Prix"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            className="form-select"
            aria-label="Default select example"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Sélectionner une catégorie</option>{" "}
            {/* Option par défaut */}
            {listOfCategories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value="Autre">Autre</option>
          </select>
        </div>
        {category === "Autre" && ( // Afficher l'input si "Autre" est sélectionné
          <div className="form-group">
            <label htmlFor="otherCategory">Nouvelle Catégorie</label>
            <input
              type="text"
              id="otherCategory"
              className="form-control"
              placeholder="Entrez la nouvelle catégorie"
              value={otherCategory}
              onChange={handleOtherCategoryChange}
            />
          </div>
        )}
        <div className="form-group">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="carousel">Carousel</label>
            <input
              type="checkbox"
              id="carousel"
              className="form-control-checkbox"
              checked={carousel}
              value={carousel}
              onChange={handleCarouselChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="visible">Visible</label>
            <input
              type="checkbox"
              id="visible"
              className="form-control-checkbox"
              checked={visible}
              value={visible}
              onChange={handleVisibleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            placeholder="Quantité"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dimension">Dimension</label>
          <input
            type="text"
            id="dimension"
            className="form-control"
            placeholder="Dimension"
            value={dimension}
            onChange={handleDimensionChange}
          />
        </div>
        {/* <div className="form-group">
                <label htmlFor="shipping">Livraison</label>
            <input
              type="checkbox"
              id="shipping"
              className="form-control"
              placeholder="Livraison"
              value={shipping}
              onChange={handleShippingChange}
              />
          </div> */}

        {/* <div className="form-group">
            <label htmlFor="sold">Vendu</label>
            <input
            type="number"
              id="sold"
              className="form-control"
              placeholder="Vendu"
              value={sold}
              onChange={handleSoldChange}
            />
            </div> */}
        <br />

        <button
          className="btn btn-success"
          type="submit"
          onClick={handleUploadVitrail}
        >
          Envoyer
        </button>
      </form>
    );
  };

  const renderVitrailList = () => {
    return (
      <>
        <h2>list of vitrails</h2>
        {!listOfVitrails || listOfVitrails.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {listOfVitrails.map((vitrail) => (
              <div
                key={vitrail._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <h3>{vitrail.title}</h3>
                {vitrail.photo && (
                  <img
                    src={vitrail.photo}
                    alt={vitrail.title}
                    style={{ width: "100%", height: "auto", cursor: "pointer" }} // Ajoute un curseur pour indiquer que l'image est cliquable
                    onClick={() => openVitrailPopup(vitrail)} // Ouvre le popup lors du clic sur l'image
                  />
                )}
                <button
                  className="btn btn-warning"
                  onClick={() => openVitrailPopup(vitrail)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteVitrail(vitrail._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    getListOfVitrails();
    getListOfCategories();
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setFormIsVisible(!formIsVisible)}
      >
        {formIsVisible ? "Masquer l'uploader" : "afficher l'uploader"}
      </button>
      {user && formIsVisible && renderUploadForm()}
      {user && !formIsVisible && renderVitrailList()}
      {isOpenPopup && selectedVitrail && (
        <VitrailPopup
          vitrail={selectedVitrail}
          onClose={closeVitrailPopup}
          user={user}
          onUpdate={getListOfVitrails}
        />
      )}
    </div>
  );
};

export default VitrailUploader;
