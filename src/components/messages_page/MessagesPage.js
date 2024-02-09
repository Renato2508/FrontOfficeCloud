import React, { useState, useEffect} from 'react';
import './MessagesPage.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useLocation } from 'react-router-dom';

const MessagesPage = () => {
  const location = useLocation();
  const id = location?.state?.id_auteur;

  if(id !== undefined){
    console.log("id olona : "+id);
  }

  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [discussionActuelle, setDiscussionActuelle] = useState([]);

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/MessagesPage');
  }, []);

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`https://cloud-back-voiture-production-3dbf.up.railway.app/discussion/discussions`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Successful:', data);
        setData(data.object);
      } else {
        console.log('Failed one:', data);
        console.error('Failed two:', response.status, response.statusText);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during calling:', error.message);
      // Handle other errors
    }
  };

  useEffect(() => {
  
    const initializeData = () => {
      fetchData();
    };
  
    initializeData();
  }, []);

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/MessagesPage');
  }, []);

  // useEffect(() => {
  //   if (id != null) {
  //     const user = userList.find(user => user.id === id);
  //     if (user) {
  //       setSelectedUser(user);
  //     }
  //   }
  // }, [id, userList,selectedUser]);


  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (message.trim() === '') return;
    var id_destinataire;
    if(localStorage.getItem('iduser') !== discussionActuelle.id1.toString()){
        id_destinataire = discussionActuelle.id1;
    }else{
        id_destinataire = discussionActuelle.id2;
    }
    const newMessage = { iddestinataire: id_destinataire, message: message };
    const newMessage2 = { expediteur: localStorage.getItem('iduser'), message: message };
    // console.log("id destinataire :"+id_destinataire);
    setConversation([...conversation, newMessage2]);
    // console.log("teeeeeeeest : "+newMessage.message);
    // setMessage('');
    try {
      var authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/discussion/message', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(newMessage),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        setMessage('');
      } else {
        console.log('Login failed:', data)
        console.error('Login failed:', response.status, response.statusText);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle other errors
    }

    fetchData();
  };  

  const handleUserClick = (discussion) => {

    setDiscussionActuelle(discussion);
    var selected_u;
    if(localStorage.getItem('iduser') !== discussion.id1.toString()){
        selected_u = discussion.nom1;
    }else{
        selected_u = discussion.nom2;
    }
    setSelectedUser(selected_u);
    setConversation(discussion.messages);

  };

  return (
    <>
    <Navbar />
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="user-list">
      {data.map((discussion) => {
          // Condition pour afficher discussion.idDiscussion
          if (localStorage.getItem('iduser') === discussion.id1.toString()) {
            return (
              <div
                className="user"
                key={discussion.idDiscussion}
                onClick={() => handleUserClick(discussion)}
              >
                {discussion.nom2}
              </div>
            );
          } else {
              return (
                <div
                  className="user"
                  key={discussion.idDiscussion}
                  onClick={() => handleUserClick(discussion)}
                >
                  {discussion.nom1}
                </div>
              );
          }
      })}
      </div>
      {selectedUser && (
        <div className="message-window">
          <div className="message-header">
            <h3>Conversation avec {selectedUser}</h3>
            <button onClick={() => setSelectedUser(null)}>Fermer</button>
          </div>
          <div className="conversation">
            {conversation.map((message, index) => (
              <div key={index} className="message">
                <span className="sender">{message.expediteur}: </span>
                <span className="content">{message.message}</span>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default MessagesPage;