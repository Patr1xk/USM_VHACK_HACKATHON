import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection

const SignUp = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!minLength) return "Password must be at least 8 characters.";
    if (!hasUpperCase) return "Password must contain an uppercase letter.";
    if (!hasNumber) return "Password must contain a number.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    console.log("Signing up with:", name, email, password);
    setError(""); // Clear any previous errors

    // Simulating successful signup
    setTimeout(() => {
      alert("Sign up successful!");
      navigate("/dashboard"); // Redirect after signup
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        
        {error && <p style={styles.error}>{error}</p>}
        
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "300px",
    margin: "50px auto",
    padding: "30px",
    border: "1.5px solid #ccc",
    borderRadius: "15px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default SignUp;
