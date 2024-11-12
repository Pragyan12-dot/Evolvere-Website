import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS file for styling

// Sample office bearers data
const officeBearers = [
  { name: 'Hiya Aidasani', image: 'https://via.placeholder.com/150' },
  { name: 'Nikhil Singh', image: 'https://via.placeholder.com/150' },
  { name: 'Susmit Ghosh', image: 'https://via.placeholder.com/150' },
  { name: 'Abhishek Kumar', image: 'https://via.placeholder.com/150' },
];

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % officeBearers.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="home-page">
        <div className='div1'>
      <header className="header">
        <div className="logo">
          <h1>Evolvere</h1>
          <p>Biotechnology Society - NIT Durgapur</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Welcome to Evolvere</h2>
          <p>
            A place where technology meets biology. Join us in advancing the frontiers of biotechnology.
          </p>
        </div>
      </section>
    </div >
      {/* Office Bearers Slider Section */}
      <div className='div2'>
      <section className="office-bearers-section">
        <h2>Meet Our Office Bearers</h2>
        <div className="slider-container">
          <div className="slider-content">
            <div className="office-bearer-info">
              <h3>{officeBearers[currentIndex].name}</h3>
            </div>
            <div className="office-bearer-image">
              <img
                src={officeBearers[currentIndex].image}
                alt={officeBearers[currentIndex].name}
              />
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
