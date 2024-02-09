// Acceuil.js
import React from 'react';
import './Acceuil.css';

const Acceuil = () => {
  return (
    <div className="acceuil-container">
      <header className="acceuil-header">
        <h1>Welcome to Our Website</h1>
      </header>
      <main className="acceuil-main">
        <section className="acceuil-services">
          <h2>Our Services</h2>
          <div className="service">
            <h3>Service 1</h3>
            <p>Description of Service 1</p>
          </div>
          <div className="service">
            <h3>Service 2</h3>
            <p>Description of Service 2</p>
          </div>
          <div className="service">
            <h3>Service 3</h3>
            <p>Description of Service 3</p>
          </div>
        </section>
        <section className="acceuil-contact">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message"></textarea>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      <footer className="acceuil-footer">
        <p>&copy; 2024 Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Acceuil;
