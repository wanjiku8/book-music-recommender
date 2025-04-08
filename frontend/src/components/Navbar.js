import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  padding: 15px 0;
`;

const NavList = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0 20px;
  font-size: 18px;

  &:hover {
    color: #4CAF50;
  }

  &.active {
    color: #4CAF50;
    font-weight: bold;
  }
`;

function Navbar({ activeTab }) {
  return (
    <Nav>
      <NavList>
        <NavLink to="/" className={activeTab === 'home' ? 'active' : ''}>Home</NavLink>
        <NavLink to="/books" className={activeTab === 'books' ? 'active' : ''}>Books</NavLink>
        <NavLink to="/songs" className={activeTab === 'songs' ? 'active' : ''}>Music</NavLink>
      </NavList>
    </Nav>
  );
}

export default Navbar;