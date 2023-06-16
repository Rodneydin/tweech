import React, { useState } from 'react';
import { FiSend, FiArrowLeft, FiTrash } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import '../styles/globals.css';

const UserMessages = ({ messages, selectedUser, handleSelectedUser, profile, handleSendMessage, handleDeleteMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (newMessage.trim() !== '') {
      handleSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleGoBack = () => {
    handleSelectedUser();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="mt-1 text-black bg-white min-h-screen">
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex items-center mb-4">
          <button onClick={handleGoBack} className="mr-2">
            <FiArrowLeft />
          </button>
          <img src={selectedUser.image} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <h2 className="font-bold">{selectedUser.name}</h2>
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {sortedMessages.map((message) => (
            <div
              key={message._id}
              className={`flex flex-col mb-4 ${
                message.sender?._id === profile._id ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`rounded-lg p-2 ${
                  message.sender?._id === profile._id ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
                }`}
              >
                {message.text}
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: false })}
                {message.sender?._id === profile._id && (
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDeleteMessage(message._id)}
                    title="Delete"
                  >
                    <FiTrash />
                  </button>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="flex fixed bottom-24 left-5 right-8 items-center mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            className="w-full rounded-l-lg p-2 mb-4 m-2"
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg p-3"
            onClick={handleSendClick}
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
