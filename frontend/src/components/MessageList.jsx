import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <MessageItem key={idx} message={msg} />
      ))}

      {loading && (
        <div className="message ai typing">Agent is typing...</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
