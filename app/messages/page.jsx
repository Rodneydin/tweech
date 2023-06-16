'use client'
import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';
import { useSelector } from 'react-redux';
import UserMessages from '../../components/UserMessages';
import MessageList from '../../components/Lists';
import { v4 as uuidv4 } from 'uuid';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const profile = useSelector((state) => state.profile);
console.log(profile)
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await client.fetch(`*[_type == "directMessage"]{
          _id,
          id,
          text,
          timestamp,
          sender->{
            _id,
            name,
            username,
            image
          },
          recipient->{
            _id,
            image,
            name,
            username
          }
        }`);
        setMessages(response);
      } catch (error) {
        console.error('Error fetching messages:', error);
        return(
          <p className='text-white'>
            There is a network connection
          </p>
        )
      }
    };

    fetchMessages();
  }, []);

  // Fetch users from Sanity
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.fetch(`*[_type == "user"]{
          _id,
          name,
          image,
        } | order(name asc)`);
        setUsers(response);
      } catch (error) {
        return<p>Check your network connection and refresh the page</p>
        
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleSendMessage = async (message) => {
    try {
      if (!selectedUser) {
        console.error('Recipient not selected.');
        return;
      }
      const newMessage = {
        _type: 'directMessage',
        id: uuidv4(),
        text: message,
        timestamp: new Date().toISOString(),
        sender: {
          _type: 'reference',
          _ref: profile._id,
        },
        recipient: {
          _type: 'reference',
          _ref: selectedUser._id,
        },
      };

      await client.create(newMessage);

      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      // Delete the message from Sanity
      await client.delete(messageId);

      // Update the messages state by removing the deleted message
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSearchQuery('');
  };

  const handleSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen container text-white bg-gray-100 flex flex-col justify-between">
      <div className="container mx-auto py-6 px-4">
        {!selectedUser && (
          <>
            <h1 className="text-2xl font-bold mb-4">Messages</h1>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search users..."
              className="px-4 py-2 w-full rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        {/* Render search results */}
        {searchQuery && (
          <div className="mt-4">
            {filteredUsers?.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-md shadow p-4 text-black flex items-center cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <h2 className="font-bold">{user.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Display recipient info */}
        {!selectedUser && (
          <div>
            <MessageList
              users={users}
              selectedUser={selectedUser}
              profile={profile}
              messages={messages}
              handleUserClick={handleUserClick}
              handleSelectedUser={handleSelectedUser}
            />
          </div>
        )}
        {/* UserMessages component */}
        {selectedUser && (
          <UserMessages
            messages={messages.filter(
              (message) =>
                (message.sender?._id === profile._id && message.recipient?._id === selectedUser._id) ||
                (message.sender?._id === selectedUser._id && message.recipient?._id === profile._id)
            )}
            selectedUser={selectedUser}
            profile={profile}
            handleSendMessage={handleSendMessage}
            handleDeleteMessage={handleDeleteMessage}
            handleSelectedUser={handleSelectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
