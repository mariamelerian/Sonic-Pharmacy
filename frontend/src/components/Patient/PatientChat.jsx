import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

const PatientChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      // Display initial welcome message with doctor icon
      setMessages([{ text: "Hello, how can I help you today?", sender: 'assistant' }]);
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'patient' }]);
      setNewMessage('');
      // Add logic for sending message to GPT or other backend
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '80vh',
        padding: '10px',
        backgroundColor: '#fff', // Set your desired background color
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
          <div style={{ marginRight: '10px' }}>
            {/* Doctor icon in a circle */}
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#007BFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUserDoctor} style={{ color: '#fff' }} />
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: '10px', color: '#000', fontSize: '14px', textAlign: 'right' }}>
            {/* Initial welcome message */}
            {isFirstRender && "Hello, how can I help you today?"}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px', width: '60%', display: 'flex', flexDirection: 'column' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: '10px',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: message.sender === 'patient' ? '#D9F4EF' : '#F4F4F4',
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            style={{ flex: 1, marginRight: '10px' }}
          />
          <button
            onClick={handleSendMessage}
            style={{ height: '35px', width: '60px', cursor: 'pointer', padding: '7px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', borderColor: '#fff' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientChat;
