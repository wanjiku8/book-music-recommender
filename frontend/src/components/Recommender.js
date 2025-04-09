import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RecommenderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;


    h1 {
    margin-bottom: 30px;
    font-size: 2.5rem;
    color: rgb(57, 36, 2);
    text-align: left;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;

    h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    color:rgb(123, 37, 6); /* Matching your nav color */
    font-weight: 500;
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
  }


     h3 
     {
    color:rgb(192, 0, 0); /* Matching your nav color */
    font-weight: 600;
    text-align: left;
    letter-spacing: -0.5px;
    text-transform: capitalize;
  }
  a
  {
   text-underline: none !important;
    text-decoration: none !important;
  }

  p
  {
  background: rgba(135, 85, 4, 0.09);
  padding: 7px 8px;
  border-radius: 4px;
  color: black;
  margin-bottom: 10px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 11ch;
  }

`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px 20px;
  margin-bottom: 20px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 12ch;
    margin-bottom: 8px; /* Optional spacing */
  }

`;



const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
`;

function Recommender() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const booksResponse = await axios.get('http://localhost:5000/recommend/books');
      const songsResponse = await axios.get('http://localhost:5000/recommend/songs');
      setRecommendedBooks(booksResponse.data);
      setRecommendedSongs(songsResponse.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <RecommenderContainer>
      <h1>Welcome to Book & Music Recommender</h1>
      
      <Section>
        <h2>Recommended Books</h2>
        <Grid>
          {recommendedBooks.map(book => (
            <Link to="/books" key={book.id}>
              <Card>
                {book.image && <img src={`http://localhost:5000${book.image}`} alt={book.title} />}
                <h3>{book.title}</h3>
              </Card>
            </Link>
          ))}
        </Grid>
      </Section>

      <Section>
        <h2>Recommended Songs</h2>
        <Grid>
          {recommendedSongs.map(song => (
            <Link to="/songs" key={song.id}>
              <Card>
                {song.image && <img src={`http://localhost:5000${song.image}`} alt={song.title} />}
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </Card>
            </Link>
          ))}
        </Grid>
      </Section>
    </RecommenderContainer>
  );
}

export default Recommender;