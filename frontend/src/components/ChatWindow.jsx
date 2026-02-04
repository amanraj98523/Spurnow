import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "../styles/chat.css";

export default function ChatWindow({ messages, onSend, loading }) {
  return (
    <div className="chat-container">
      <div className="chat-header">Spur Support</div>

      <MessageList messages={messages} loading={loading} />

      <ChatInput onSend={onSend} loading={loading} />
    </div>
  );
}
