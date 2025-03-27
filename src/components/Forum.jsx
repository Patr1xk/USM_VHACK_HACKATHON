import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Forum() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const storedThreads = JSON.parse(localStorage.getItem('threads')) || [];
    setThreads(storedThreads);
  }, []);

  const styles = {
    homeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      padding: '10px 20px',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    container: {
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '800px',
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      left: '50px',
    },
    heading: {
      fontSize: '35px',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      marginBottom: '20px',
      transition: 'background-color 0.3s',
    },
    threadList: {
      listStyleType: 'none',
      padding: '0',
      marginBottom: '20px',
    },
    threadItem: {
      backgroundColor: '#fff',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    noThreads: {
      textAlign: 'center',
      color: '#6c757d',
      fontSize: '1.2rem',
    },
    image: {
      position: 'absolute', // Position the image outside the container
      left: '20px', 
      top: '100px', // Adjust top to align with the content
      width: '350px', // Increase the image size
      height: 'auto',
    },
  };

  return (
    <>
      <Link
        to="/dashboard"
        style={styles.homeButton}
      >
        Home
      </Link>

      <img src="./uncleTalking.png" alt="Uncle Talking" style={styles.image} />

      <div style={styles.container}>
        <h1 style={styles.heading}>Forum</h1>
        <Link to="/create-thread" style={styles.button}>
          Create New Thread
        </Link>

        <h3>Threads:</h3>
        <ul style={styles.threadList}>
          {threads.length > 0 ? (
            threads.map((thread, index) => (
              <li key={index} style={styles.threadItem}>
                <Link
                  to={`/thread/${index}`}
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  {thread.title}
                </Link>
              </li>
            ))
          ) : (
            <p style={styles.noThreads}>No threads yet. Start by creating one!</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default Forum;
