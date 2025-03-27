import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Header = () => {
  return (
    <header style={styles.header}>
      <img src="./logo.png" alt="logo.png" style={styles.logo} />
      <h1 style={styles.title}>AI chatbot</h1>
      <div style={styles.dashboard}>
        <nav>
          <Link to="/dashboard">
            <button style={styles.homeButton}>Home</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

const ChatbotEmbed = () => {
  return (
    <div style={styles.chatbotWithHeader}>
      <Header />
      <div style={styles.chatbot}>
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/24/06/20250324061017-573YBF1V.json "
          style={styles.chatbotIframe}
          allow="microphone;"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default ChatbotEmbed;

const styles = {
  header: {
    display: 'flex',                // Create a flex container
    justifyContent: 'space-between', // Space between the elements (logo, title, home button)
    alignItems: 'center',           // Align items vertically in the center
    fontFamily: "'Poppins', sans-serif",
    padding: '10px',                // Padding for spacing
  },
  logo: {
    height: '80px',                 // Adjust logo size
    marginLeft: '20px',             // Space between logo and the left edge
  },
  title: {
    margin: 0,                      // Remove any default margin
    padding: 0,                     // Remove any default padding
    fontSize: '35px',                // Set font size for title
    textAlign: 'center',            // Center the title text
    flex: 1,                         // Allow the title to take up available space
  },
  dashboard: {
    display: 'flex',                 // Flex container for the button
    justifyContent: 'flex-end',      // Align the home button to the right
    marginRight: '20px',             // Space between button and the right edge
  },
  homeButton: {
    backgroundColor: '#f5f1e9',
    color: 'black',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '16px',
  },
  chatbotWithHeader: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatbot: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  chatbotIframe: {
    height: '400px',
    width: '1000px',
    fontFamily: "'Poppins', sans-serif",
    border: 'none',
  },
};
