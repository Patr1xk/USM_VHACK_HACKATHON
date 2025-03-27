import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Thread() {
  const { id } = useParams(); // Get thread ID from URL
  const [thread, setThread] = useState(null);
  const [newPost, setNewPost] = useState("");

  // Load the thread and its posts
  useEffect(() => {
    const storedThreads = JSON.parse(localStorage.getItem("threads")) || [];
    const selectedThread = storedThreads[id];
    setThread(selectedThread);
  }, [id]);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const storedThreads = JSON.parse(localStorage.getItem("threads")) || [];
      storedThreads[id].posts.push(newPost);
      localStorage.setItem("threads", JSON.stringify(storedThreads));
      setNewPost("");
      setThread({ ...thread, posts: [...thread.posts, newPost] }); // Update thread in state
    }
  };

  if (!thread) return <p>Loading...</p>;

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
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      width: "80%",
      maxWidth: "800px",
      margin: "20px auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "35px",
      color: "#333",
      marginBottom: "10px",
    },
    description: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "20px",
    },
    postList: {
      listStyleType: "none",
      padding: "0",
      marginBottom: "20px",
    },
    postItem: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    inputContainer: {
      marginTop: "20px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid ",
      borderRadius: "5px",
      fontSize: "1rem",
      marginBottom: "10px",
      boxSizing: "border-box",
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
      <Link
        to="/forum"
        style={styles.backButton}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.backButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.backButton.backgroundColor)}
      >
        Back
      </Link>

      <div style={styles.container}>
        <h2 style={styles.heading}>{thread.title}</h2>
        <p style={styles.description}>{thread.description}</p>

        <h3>Discussion</h3>
        <ul style={styles.postList}>
          {thread.posts.map((post, index) => (
            <li key={index} style={styles.postItem}>
              {post}
            </li>
          ))}
        </ul>

        <div style={styles.inputContainer}>
          <textarea
            style={styles.textarea}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            onClick={handlePostSubmit}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default Thread;
