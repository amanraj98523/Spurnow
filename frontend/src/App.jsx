import ChatWindow from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";

export default function App() {
  const { messages, sendUserMessage, loading } = useChat();

  return (
    <div style={{ height: "100vh" }}>
      <ChatWindow
        messages={messages}
        onSend={sendUserMessage}
        loading={loading}
      />
    </div>
  );
}
