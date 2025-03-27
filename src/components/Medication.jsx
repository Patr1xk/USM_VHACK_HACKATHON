import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Medication = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const loggedInUser = localStorage.getItem("loggedInUser");

  // Fetch saved medications when the component mounts or loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      const savedMedications = JSON.parse(localStorage.getItem(`${loggedInUser}_medications`)) || [];
      setMedications(savedMedications);
      setProgress(savedMedications.length * 20); // Update progress based on the number of medications
    }
  }, [loggedInUser]); // This will run when `loggedInUser` changes

  const handleAddMedication = () => {
    if (!newMedication.trim()) {
      setError("Please enter a medication name.");
      return;
    }

    if (!loggedInUser) {
      setError("No user logged in. Please log in again.");
      return;
    }

    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    setNewMedication("");
    setProgress(updatedMedications.length * 20);

    // Save updated medications to localStorage
    localStorage.setItem(`${loggedInUser}_medications`, JSON.stringify(updatedMedications));
  };

  return (
    <div style={styles.page}>
      {/* Home Button - Fixed to Top Right of the Page */}
      <button onClick={() => navigate("/dashboard")} style={styles.homeButton}>
        Home
      </button>

      <div style={styles.container}>
        <h2>Manage Your Medications</h2>

        <input
          type="text"
          placeholder="Enter medication name"
          value={newMedication}
          onChange={(e) => {
            setNewMedication(e.target.value);
            setError(""); // Clear error when typing
          }}
          style={styles.input}
        />
        <button onClick={handleAddMedication} style={styles.button}>Add Medication</button>

        {error && <p style={styles.error}>{error}</p>}

        <ul style={styles.medicationList}>
          {medications.map((medication, index) => (
            <li key={index} style={styles.medicationItem}>
              {medication}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  homeButton: { 
    position: "fixed",  
    top: "20px",  
    right: "20px",  
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    color: "black",
    cursor: "pointer",
    backgroundColor: "#f5f1e9",
    transition: "background-color 0.3s",
    zIndex: 1000, 
  },
  container: { 
    fontWeight: "bold", 
    maxWidth: "400px", 
    margin: "45px auto", 
    padding: "20px", 
    border: "1px solid #ccc", 
    borderRadius: "10px", 
    textAlign: "center", 
    backgroundColor: "#fff" 
  },
  input: { padding: "10px", width: "80%", marginBottom: "10px" },
  button: { padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" },
  error: { color: "red", fontSize: "14px" },
  medicationList: { marginTop: "20px", listStyleType: "none", paddingLeft: "0" },
  medicationItem: { padding: "10px", borderBottom: "1px solid #ccc" },
};

export default Medication;
