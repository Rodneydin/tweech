import { formatDistanceToNow } from 'date-fns';

const MessageList = ({ users, selectedUser, profile, messages, handleUserClick }) => {
  const getUserMessage = (user) => {
    const recipientMessages = messages.filter(
      (message) =>
        (message.sender?._id === profile._id && message.recipient?._id === user._id) ||
        (message.sender?._id === user._id && message.recipient?._id === profile._id)
    );

    if (recipientMessages.length === 0) {
      return null;
    }

    const lastMessage = recipientMessages[recipientMessages.length - 1];

    return (
      <>
        <p className="text-gray-500">
          {lastMessage.sender?._id === profile._id ? 'You: ' : user.name + ': '}
          {lastMessage.text}
        </p>
        <p className="text-gray-500 text-sm">
          Last message: {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
        </p>
      </>
    );
  };

  return (
    <div>
      {users?.map((user) => {
        if (user._id !== profile._id) {
          return (
            <div
              key={user._id}
              className={`bg-white rounded-md shadow-lg m-4 p-4 flex items-center cursor-pointer ${
                user._id === selectedUser?._id ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleUserClick(user)}
            >
              <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <h2 className="font-bold">{user.name}</h2>
                {getUserMessage(user)}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MessageList;
