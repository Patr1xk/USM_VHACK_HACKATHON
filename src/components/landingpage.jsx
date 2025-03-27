import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const LandingPage = () => {
  const [hoveredFact, setHoveredFact] = useState(null); // Track which fact is hovered

  const styles = {
    container: {
      width: "100%",
      height: "100vh",
      backgroundColor: "#f5f1e9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      fontFamily: "'Paytone One', sans-serif",
    },
    navbar: {
      position: "absolute",
      top: "20px",
      right: "8px",
    },
    navLinks: {
      textDecoration: "none",
      color: "black",
      fontSize: "18px",
      fontWeight: "bold",
      margin: "0 15px",
    },
    brandContainer: {
      position: "absolute",
      top: "12px",
      left: "102px",
      textAlign: "left",
    },
    logoContainer: {
      position: "absolute",
      top: "-10px",
      left: "9px",
    },
    brandLogo: {
      width: "100px",
      height: "150px",
      objectFit: "contain",
    },
    brandName: {
      fontSize: "35px",
      fontWeight: "bold",
      color: "black",
    },
    slogan: {
      fontSize: "20px",
      color: "black",
      marginTop: "0px",
    },
    imageContainer: {
      position: "absolute",
      top: "38%",
      left: "45%",
      transform: "translate(-50%, -50%)",
      width: "55%",
    },
    mainImage: {
      marginLeft: "80px",
      width: "100%",
      display: "block",
    },
    fact: {
      position: "absolute",
      background: "transparent",
      padding: "14px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      width: "200px",
      textAlign: "center",
      fontWeight: "bold",
    },
    factHover: {
      transform: "scale(1.2)",
    },
    factPositions: [
      { top: "42%", left: "3%" },
      { top: "47%", right: "-25%" },
      { bottom: "26%", left: "-8%" },
      { bottom: "16%", right: "-43%" },
    ],
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div>
          <Link to="/login" style={styles.navLinks}>Login</Link> |
          <Link to="/signup" style={styles.navLinks}>Register</Link>
        </div>
      </nav>
      <div style={styles.logoContainer}>
        <img src="/logo.png" alt="Bestes logo" style={styles.brandLogo} />
      </div>
      <div style={styles.brandContainer}>
        <div style={styles.brandName}>Bestes</div>
        <div style={styles.slogan}>Your Best Partner in Diabetes Care.</div>
      </div>
      <div style={styles.imageContainer}>
        <img src="/landingpage.png" alt="Health Illustration" style={styles.mainImage} />
        {styles.factPositions.map((position, index) => (
          <div
            key={index}
            style={{
              ...styles.fact,
              ...position,
              ...(hoveredFact === index ? styles.factHover : {}), // Apply hover effect
            }}
            onMouseEnter={() => setHoveredFact(index)}
            onMouseLeave={() => setHoveredFact(null)}
          >
            {index === 0 && "Diabetes affects over 422 million people worldwide 🌍"}
            {index === 1 && "Type 2 diabetes is preventable with a healthy lifestyle 🏃‍♂🥦"}
            {index === 2 && "Uncontrolled diabetes can cause heart disease, kidney failure, and vision loss ⚠"}
            {index === 3 && "Monitoring blood sugar regularly helps prevent complications 🔬📉"}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
