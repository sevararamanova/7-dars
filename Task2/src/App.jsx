import React, { useState, useEffect } from 'react';
import './App.css'; // Stil faylini import qilish

const App = () => {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows/1')
      .then(response => response.json())
      .then(data => {
        setShowData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!showData) {
    return (
      <div className="app">
        <h1>TV Show Details</h1>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>TV Show Details</h1>
      <div className="show-details">
        <h2>{showData.name}</h2>
        <img src={showData.image.medium} alt={showData.name} className="show-image" />
        <p className="show-summary">{showData.summary.replace(/<[^>]+>/g, '')}</p>
        <p className="show-genres">Genres: {showData.genres.join(', ')}</p>
      </div>
    </div>
  );
};

export default App;
