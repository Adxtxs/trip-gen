import React from 'react';
import '../homepage.css'; // Optional: if you want to style using a separate CSS file
import travelImage from '../images/sea-landscape-nature-307008.jpg'; // Adjust the path accordingly
import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div className="content">
          <h1>Plan Your Dream Vacation</h1>
          <p>Let AI create the perfect itinerary for your next adventure.</p>
          <Link to="/createItinerary" className="cta-button">
            Get Started
          </Link>
        </div>
        <div className="image-container">
          <img src={travelImage} alt="Travel" />
        </div>
      </div>
      <div className="description-section">
        <h2>How It Works</h2>
        <p>Just enter your preferences, and our AI will generate a personalized travel plan tailored just for you.</p>
      </div>
    </div>
  );
}

export default HomePage;
