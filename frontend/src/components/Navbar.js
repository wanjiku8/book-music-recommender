import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #eb5c2a;
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.56);
  width: 100%;
  
  /* Optional: Add transition for smooth effects */
  transition: all 0.3s ease;
  
  
 
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
    color:rgb(251, 212, 196);
  }

  &.active {
    color:rgb(62, 62, 61);
    font-weight: bold;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavLink 
        to="/"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Home
      </NavLink>
      <NavLink 
        to="/books"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Books
      </NavLink>
      <NavLink 
        to="/songs"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Music
      </NavLink>
    </Nav>
  );
}

export default Navbar;