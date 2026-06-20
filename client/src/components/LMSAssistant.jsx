import { useState, useEffect, useRef } from "react";

const LMSAssistant = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  const assistantRef = useRef(null);

  const messages = [
    "👋 Welcome to Kapwa Connect!",
    "📚 Check your courses from the dashboard.",
    "🎥 Live class links appear before class starts.",
    "💌 Need help? Contact your teacher.",
  ];

  // Close assistant when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        assistantRef.current &&
        !assistantRef.current.contains(event.target)
      ) {
        setOpen(false);
        setVisible(false);
        setShowIcon(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto hide after 6 seconds
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
      setShowIcon(true);
      setOpen(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [visible]);

  const showAssistant = () => {
    setVisible(true);
    setShowIcon(false);
    setOpen(false);
  };

  return (
    <div ref={assistantRef}>
      {visible && (
        <div
          className="retro-assistant"
          onClick={() => setOpen((prev) => !prev)}
        >
          <img src="/retro-girl.png" alt="assistant" />
        </div>
      )}

      {showIcon && (
        <div className="assistant-icon" onClick={showAssistant}>
          ?
        </div>
      )}

      {open && visible && (
        <div className="assistant-chat">
          <h3>Hey, KC here! 🖐</h3>

          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LMSAssistant;
