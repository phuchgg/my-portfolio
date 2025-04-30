// FloatingChatButton.jsx
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import '../css/Chat.css';

export default function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <div className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </div>
    </div>
  );
}
