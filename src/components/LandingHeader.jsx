import React from "react";

const LandingHeader = () => {
  return (
    <header style={styles.header}>
      <h1>DiaWithMe</h1>
      <p>Stay on track, you're not alone. Managing diabetes, together!</p>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#f5f1e9",
    color: "brown",
    padding: "10px",
    textAlign: "center",
  },
};

export default LandingHeader;
