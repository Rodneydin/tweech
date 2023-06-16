const getRecipientInfo = (user) => {
    if (!selectedUser || !profile || !selectedUser._id || !profile._id) {
      return null;
    }
  
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
          {lastMessage.sender?._id === profile._id ? 'You: ' : ''}
          {lastMessage.text}
        </p>
        <p className="text-gray-500 text-sm">
          Last message: {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
        </p>
      </>
    );
  };