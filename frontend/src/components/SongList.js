import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SongForm from './SongForm';
import styled from 'styled-components';

const SongContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SongCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }

  .song-info {
    flex: 1;
  }

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  .artist {
    color: #666;
    margin-bottom: 10px;
  }

  .bpm {
    display: inline-block;
    background: #f0f0f0;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

function SongList() {
  const [songs, setSongs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleAddSong = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchSongs();
  };

  return (
    <SongContainer>
      <h1>Music Collection</h1>
      <button onClick={handleAddSong}>Add New Song</button>
      
      {showForm && <SongForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />}
      
      <div className="grid">
        {songs.map(song => (
          <SongCard key={song.id} onClick={() => navigate(`/songs/${song.id}`)}>
            {song.image && <img src={`http://localhost:5000${song.image}`} alt={song.title} />}
            <div className="song-info">
              <h3>{song.title}</h3>
              <p className="artist">by {song.artist}</p>
              <span className="bpm">{song.bpm} BPM</span>
              <p>{song.description?.substring(0, 100)}...</p>
            </div>
          </SongCard>
        ))}
      </div>
    </SongContainer>
  );
}

export default SongList;