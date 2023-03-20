import React from 'react';
import './header.css';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="logo512.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
