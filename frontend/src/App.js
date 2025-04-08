import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import SongList from './components/SongList';
import Recommender from './components/Recommender';
import { GlobalStyle } from './styles/globalStyles';

function App() {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Routes>
          <Route path="/" element={<Recommender />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/songs" element={<SongList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;