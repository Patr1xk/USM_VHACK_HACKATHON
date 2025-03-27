import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Swiper from 'swiper';
import 'swiper/css';
import Footer from "./components/Footer"

import Header from './components/Header';
import DoctorIcon from './components/DoctorIcon';
import Button1 from './components/Button1';
import Websitedetail1 from './components/Websitedetail1';
import CardHover from './components/CardHover';
import Communicationdetails from './components/Communicatepic';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Carousel } from 'primereact/carousel';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from './components/Slider1';

import "./index.css";
import "./Card.css";

const DashBoard = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    if (loggedInUser != null) {
      const hasMedication = localStorage.getItem(`${loggedInUser}_medications`) !== null;
      const lastNotified = localStorage.getItem(`${loggedInUser}_lastNotification`);
      const today = new Date().toDateString();

      if (hasMedication) {
        
        
        if (!lastNotified || lastNotified !== today) {
          console.log("Setting lastNotification for user:", loggedInUser); // Debugging log
          localStorage.setItem(`${loggedInUser}_lastNotification`, today);
          setShowReminder(true);
        }
        
      }
    }
  }, [loggedInUser]);
  

  return (
    <div>
      <main>
        <div className="pt-0">
          <Header />
        </div>

        <div className="container mb-120 mx-auto px-10 py-8">
          <section>
            <h2 className="text-6xl font-bold mt-20 ml-10" style={{ fontFamily: '"Paytone One", sans-serif', color: 'black' }}><span className="text-gradient">One Step Solution</span></h2>
            <h2 className="text-6xl font-bold ml-10" style={{ color: 'black' }}>for all your dietary needs</h2>
          </section>
        </div>
        <div>
          <section>
            <h3 className="text-2xl font-bold transform translate-x-20 ml-2" style={{ color: 'black' }}>
              Using your BMI index we calculate whether the
            </h3>
            <h3 className="text-2xl font-bold transform translate-x-20 ml-2" style={{ color: 'black' }}>
              dish is suitable for you
            </h3>
          </section>
        </div>
        <div className='absolute top-0 right-20 z-50'>
          <section>
            <DoctorIcon />
          </section>
        </div>

        <div className="container mb-180 mx-auto px-20 py-8">
          <section>
            <Link to="/mealplan">
              <Button1 variant="primary" size="lg" className="effect3" />
            </Link>
          </section>
        </div>

        <div>
          <div className="container-fluid p-0 m-0" style={{ display: 'flex', justifyContent: 'flex-start', width: '100vw', maxWidth: '100%', padding: 0, marginBottom: 80 }}>
            <section style={{
              backgroundColor: '#e5dbc6', width: '100%', height: '550px', maxWidth: '100%', minHeight: '300px', position: 'relative', margin: 0,
            }}>
              <Websitedetail1 />
            </section>
          </div>

          <div className="container mx-auto px-10 py-0">
            <section>
              <h2 className="text-4xl font-bold text-center" style={{ color: 'black' }}>Check out our food recommendation for healthy diet</h2>
              <Slider1 />
            </section>
          </div>
        </div>

        <div className="container mx-auto px-10 py-0 ">
          <h2 className="text-4xl font-bold text-center transform translate-y-20" style={{ fontFamily: '"Paytone One", sans-serif', color: 'black' }} >Our features</h2>
          <h4 className="text-2xl font-bold text-center transform translate-y-28" style={{ color: 'black' }}>One step closer to healthier lifestyle </h4>
          <section className="mt-20 transform translate-y-2">
            <CardHover />
          </section>
        </div>

        <div>
          <section>
            {/* <Review/> */}
          </section>
        </div>

        <div className="container-fluid p-0 m-0" style={{ display: 'flex', justifyContent: 'flex-start', width: '100vw', maxWidth: '100%', padding: 0, marginBottom: 80 }}>
          <section style={{
            backgroundColor: '#e5dbc6', width: '100%', height: '580px', maxWidth: '100%', minHeight: '300px', position: 'relative', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '20px'
          }}>
            <Communicationdetails />
            <h2 className="text-2xl font-bold" style={{ textAlign: 'center', fontFamily: '"Paytone One", sans-serif', color: 'black' }}>💬 Bestes Community Forum – Connect, Share, Thrive!</h2>
            <h4 className="text-2xs font-bold" style={{ textAlign: 'center', color: 'black' }}>Welcome to the Bestes Community Forum! Jump in, start a conversation, and let’s navigate diabetes together. 🚀💙</h4>
            <h4 className="text-2xs font-bold" style={{ textAlign: 'center', color: 'black' }}>This is your space to connect with others on the diabetes journey—ask questions, share experiences, and discover tips for better management.</h4>
            <h4 className="text-2xs font-bold" style={{ textAlign: 'center', color: 'black' }}>Whether you're newly diagnosed, a long-time warrior, or supporting a loved one, you're not alone! </h4>
            <Link to="/forum">
              <button
                type="Main Page"
                className=" bg-red-400 text-white py-2 px-9 rounded-md hover:bg-red-800 disabled:bg-red-900 "
              >
                Forum Page
              </button>
            </Link>
          </section>
        </div>

        <Footer/>
      </main>

      {/* Reminder Modal */}
      {showReminder && (
        <div style={styles.overlay}>
          <div style={styles.reminderPopup}>
            <p style={styles.reminderText}>Don't forget to take your medication today! 💊</p>
            <button onClick={() => setShowReminder(false)} style={styles.closeButton}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark semi-transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001, // Higher than your home button
  },
  reminderPopup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    minWidth: "300px",
    maxWidth: "400px",
  },
  reminderText: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default DashBoard;
