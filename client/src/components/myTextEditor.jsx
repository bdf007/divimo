import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Style par défaut de Quill

const MyTextEditor = ({ description, setDescription }) => {
  return (
    <ReactQuill
      value={description}
      onChange={setDescription}
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike"], // outils de mise en forme
          [{ color: [] }, { background: [] }], // couleurs
          [{ align: [] }],
          ["link", "image"], // autres options
          ["clean"], // nettoie la mise en forme
        ],
      }}
    />
  );
};

export default MyTextEditor;
