import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookForm from './BookForm';
import styled from 'styled-components';

const BookContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;


    h1{
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #eb5c2a; /* Matching your nav color */
    font-weight: 500;
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
  }
`;

const BookCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  .book-info {
    flex: 1;
  }

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  .author {
    color: #666;
    margin-bottom: 10px;
  }

  .genre {
    display: inline-block;
    background: #f0f0f0;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

function BookList() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchBooks();
  };

  return (
    <BookContainer>
      <h1>Book Collection</h1>
      <button onClick={handleAddBook}>Add New Book</button>
      
      {showForm && <BookForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />}
      
      <div className="grid">
        {books.map(book => (
          <BookCard key={book.id} onClick={() => navigate(`/books/${book.id}`)}>
            {book.image && <img src={`http://localhost:5000${book.image}`} alt={book.title} />}
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <span className="genre">{book.genre}</span>
              <p>{book.description?.substring(0, 100)}...</p>
            </div>
          </BookCard>
        ))}
      </div>
    </BookContainer>
  );
}

export default BookList;