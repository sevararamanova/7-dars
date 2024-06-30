import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const toggleExpand = (id) => {
    setShows(prevShows => {
      return prevShows.map(show => {
        if (show.id === id) {
          return { ...show, expanded: !show.expanded };
        }
        return show;
      });
    });
  };

  return (
    <div className="App">
      <h1>TVMaze Shows</h1>
      <div className="cards-container">
        {shows.map(show => (
          <div key={show.id} className="card">
            <div className="card-image">
              {show.image && (
                <img src={show.image.medium} alt={show.name} />
              )}
            </div>
            <div className="card-content">
              <h2>{show.name}</h2>
              <p className={show.expanded ? 'expanded-content' : 'collapsed-content'}>
                {show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available.'}
              </p>
              <div className="see-more">
                <button onClick={() => toggleExpand(show.id)}>
                  {show.expanded ? 'Show less...' : 'Show more...'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
