import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer"; // Keep footer as is
import { Link } from "react-router-dom";

const ProgressBar = () => {
  const [points, setPoints] = useState(0);
  const [vouchers, setVouchers] = useState([
    { id: 1, name: "Discount Voucher 1", redeemed: false, image: "./v1.jpg" },
    { id: 2, name: "Discount Voucher 2", redeemed: false, image: "./v2.jpg" },
    { id: 3, name: "Discount Voucher 3", redeemed: false, image: "./v3.jpg" },
    { id: 4, name: "Discount Voucher 4", redeemed: false, image: "./v4.jpg" },
    { id: 5, name: "Discount Voucher 5", redeemed: false, image: "./v5.jpg" },
    { id: 6, name: "Discount Voucher 6", redeemed: false, image: "./v6.jpg" },
  ]);

  const [timer, setTimer] = useState(null);
  const [checkInStatus, setCheckInStatus] = useState(""); // For showing check-in status
  const [thankYouMessage, setThankYouMessage] = useState(""); // For showing thank you message

  // Load points from localStorage when the component mounts
  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }
    startTimer();
  }, []);

  // Function to handle check-in
  const handleCheckIn = () => {
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    const now = new Date();

    if (lastCheckIn) {
      const lastCheckInDate = new Date(lastCheckIn);
      const timeDifference = now - lastCheckInDate;
      const hoursLeft = 24 - Math.floor(timeDifference / (1000 * 60 * 60));

      if (hoursLeft > 0) {
        setCheckInStatus(`Please wait ${hoursLeft} hour(s) to check in again.`);
        setTimeout(() => {
          setCheckInStatus("");
        }, 4000);
        return;
      }
    }

    setPoints((prev) => {
      const newPoints = prev + 5;
      const updatedPoints = newPoints >= 100 ? 100 : newPoints;
      localStorage.setItem("points", updatedPoints);
      return updatedPoints;
    });

    localStorage.setItem("lastCheckIn", now.toString());

    setThankYouMessage("Thank you for checking in! (+5 points)");

    setTimeout(() => {
      setThankYouMessage("");
    }, 4000);

    startTimer();
  };

  // Function to start the countdown timer
  const startTimer = () => {
    const countdown = setInterval(() => {
      const lastCheckIn = localStorage.getItem("lastCheckIn");
      if (lastCheckIn) {
        const lastCheckInDate = new Date(lastCheckIn);
        const now = new Date();
        const timeDifference = now - lastCheckInDate;
        const hoursLeft = 24 - Math.floor(timeDifference / (1000 * 60 * 60));

        if (hoursLeft <= 0) {
          clearInterval(countdown);
          setTimer(null);
        } else {
          setTimer(hoursLeft);
        }
      }
    }, 1000);
  };

  // Function to redeem a voucher
  const handleRedeem = (id) => {
    if (points >= 100) {
      setVouchers((prevVouchers) =>
        prevVouchers.map((voucher) =>
          voucher.id === id ? { ...voucher, redeemed: true } : voucher
        )
      );
      setPoints(0);
      localStorage.setItem("points", 0);
    }
  };

  return (
    <>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Collect Points</h1>
        <Link to="/dashboard">
          <button style={styles.headerButton}>Home</button>
        </Link>
        
      </div>

      <div style={styles.container}>
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <motion.svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="#ccc" strokeWidth="10" fill="none" />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              stroke="#4CAF50"
              strokeWidth="10"
              fill="none"
              strokeDasharray="314"
              strokeDashoffset={314 - (314 * points) / 100}
              transition={{ duration: 0.5 }}
            />
            <text x="50%" y="50%" textAnchor="middle" dy="8px" fontSize="18px" fontWeight="bold">
              {points} / 100
            </text>
          </motion.svg>
        </div>

        {/* Check-in Button */}
        <button onClick={handleCheckIn} style={styles.checkInButton}>
          Check-in (+5 points)
        </button>

        {/* Timer and Thank You Message */}
        <div style={styles.timerContainer}>
          {checkInStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {checkInStatus}
            </motion.div>
          )}

          {thankYouMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {thankYouMessage}
            </motion.div>
          )}

          {timer !== null && (
            <div>
              <span>{`Time left to next check-in: ${timer} hour(s)`}</span>
            </div>
          )}
        </div>

        {/* Vouchers */}
        <div style={styles.voucherHeader}>🎉 Get Rewarded 🎉</div>
        <div style={styles.voucherContainer}>
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              style={{
                ...styles.voucher,
                opacity: voucher.redeemed ? 0.5 : 1,
                cursor: points >= 100 ? "pointer" : "not-allowed",
                position: "relative",
              }}
            >
              <div style={styles.imageContainer}>
                <img src={voucher.image} style={styles.voucherImage} alt="Voucher" />
                <button
                  onClick={() => handleRedeem(voucher.id)}
                  style={{
                    ...styles.redeemButton,
                    opacity: voucher.redeemed ? 0.5 : 1,
                    cursor: points >= 100 ? "pointer" : "not-allowed",
                  }}
                  disabled={voucher.redeemed || points < 100}
                >
                  Redeem Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

// Styles
const styles = {
  headerContainer: {
  marginTop: '25px',
  display: "flex",
  justifyContent: "center",  // Center the header text
  alignItems: "center",  // Align header text vertically
  padding: "10px 20px",
  backgroundColor: "#f5f1e9",
  width: "100%",
  position: "relative",  // Ensure the button is positioned relative to this container
},

header: {
  margin: '0',
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",  // Center the header text
},

headerButton: {
  position: "absolute",  // Position button absolutely inside header container
  top: "5px",  // Align at the top of the container
  right: "20px",  // Align to the right of the container
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  color: "black",
  cursor: "pointer",
  textDecoration: "none",  // Remove underline
  backgroundColor: "#f5f1e9",
  transition: "background-color 0.3s",
},

// Hover effect for the button (optional)
headerButtonHover: {
  backgroundColor: "#0056b3",
},

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    backgroundColor: "#f5f1e9",
    fontFamily: "'Paytone One', sans-serif",
  },
  progressContainer: {
    marginBottom: "20px",
  },
  checkInButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
  },
  timerContainer: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    marginBottom: "20px",
  },
  voucherHeader: {
    fontSize: "23px",
    textAlign: "center",
    margin: "3px",
    marginBottom: "20px",
  },
  voucherContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
  voucherImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  redeemButton: {
    position: "absolute",
    bottom: "10%",
    left: "45%",
    transform: "translateX(-50%)",
    padding: "3% 10%",
    fontSize: "80%",
    borderRadius: "5%",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
  },
};

export default ProgressBar;
