// MessengerComponent.js
import React, { useState } from 'react';
import './MessengerComponent.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const MessengerComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/LoginPage');
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Vous pouvez également implémenter ici l'envoi du message à un serveur ou à d'autres utilisateurs
    }
  };

  return (
    <>
    <Navbar />
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Messagerie</h3>
      </div>
      <div className="messenger-body">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MessengerComponent;
