import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateThread() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateThread = () => {
    const newThread = { title, description, posts: [] };

    const storedThreads = JSON.parse(localStorage.getItem("threads")) || [];
    storedThreads.push(newThread);
    localStorage.setItem("threads", JSON.stringify(storedThreads));

    navigate("/forum"); // Redirect to forum page
  };

  // Inline styles for the component
  const styles = {
    backButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      color: "black",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "35px",
      color: "#333",
      marginBottom: "20px",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      backgroundColor: "#fff",
      color: "#333",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <>
      {/* Back Button at Top-Right */}
      <button
        style={styles.backButton}
        onClick={() => navigate("/forum")}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.backButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.backButton.backgroundColor)}
      >
        Back
      </button>

      <div style={styles.container}>
        <h2 style={styles.heading}>Create New Thread</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread Title"
          style={styles.inputField}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Thread Description"
          style={styles.inputField}
        />
        <button
          onClick={handleCreateThread}
          style={styles.button}
        >
          Create Thread
        </button>
      </div>
    </>
  );
}

export default CreateThread;
