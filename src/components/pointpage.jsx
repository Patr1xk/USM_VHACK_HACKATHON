import { useState } from "react";
import { motion } from "framer-motion";

const PointsPage = () => {
  const [points, setPoints] = useState(0);
  const [vouchers, setVouchers] = useState([
    { id: 1, name: "Discount Voucher", redeemed: false },
    { id: 2, name: "Free Health Check", redeemed: false },
    { id: 3, name: "Meal Plan Discount", redeemed: false },
  ]);

  // Function to add points
  const handleCheckIn = () => {
    setPoints((prev) => {
      const newPoints = prev + 5;
      return newPoints >= 100 ? 100 : newPoints; // Cap at 100
    });
  };

  // Function to redeem a voucher
  const handleRedeem = (id) => {
    if (points >= 100) {
      setVouchers((prevVouchers) =>
        prevVouchers.map((voucher) =>
          voucher.id === id ? { ...voucher, redeemed: true } : voucher
        )
      );
      setPoints(0); // Reset points after redemption
    }
  };

  return (
    <div style={styles.container}>
      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <motion.svg width="120" height="120" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle cx="60" cy="60" r="50" stroke="#ccc" strokeWidth="10" fill="none" />
          {/* Progress Circle */}
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
          {/* Text inside circle */}
          <text x="50%" y="50%" textAnchor="middle" dy="8px" fontSize="18px" fontWeight="bold">
            {points} / 100
          </text>
        </motion.svg>
      </div>

      {/* Check-in Button */}
      <button onClick={handleCheckIn} style={styles.checkInButton}>
        Check-in (+5 points)
      </button>

      {/* Vouchers */}
      <div style={styles.voucherContainer}>
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            style={{
              ...styles.voucher,
              opacity: voucher.redeemed ? 1 : 0.5, // Dim if not redeemed
              cursor: points >= 100 ? "pointer" : "not-allowed",
            }}
            onClick={() => handleRedeem(voucher.id)}
          >
            {voucher.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
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
  voucherContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  voucher: {
    padding: "20px",
    fontSize: "18px",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "white",
    textAlign: "center",
    width: "150px",
  },
};

export default PointsPage;
