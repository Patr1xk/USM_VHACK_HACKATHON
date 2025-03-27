import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Store user in localStorage
    localStorage.setItem("loggedInUser", email);

    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={styles.toggleButton}
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "300px", margin: "50px auto", padding: "30px", border: "1.5px solid #ccc", borderRadius: "15px", textAlign: "center", backgroundColor: "#f9f9f9" },
  form: { display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "10px", fontSize: "16px" },
  toggleButton: { background: "none", border: "none", cursor: "pointer", color: "#007BFF", fontSize: "14px", marginTop: "5px" },
  button: { padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer", fontSize: "18px", marginTop: "20px" },
  error: { color: "red", fontSize: "14px" },
};

export default Login;
