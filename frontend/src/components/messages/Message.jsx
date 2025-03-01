const Message = ({ message }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{message.message}</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};

export default Message;
