"use client";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleMessageSend = async () => {
    try {
      setMessages([...messages, { sender: "user", text: userMessage }]);
      setUserMessage("");

      const response = await fetch("http://127.0.0.1:8000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan respons dari API");
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.response },
      ]);
    } catch (error) {
      console.error("Terjadi error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Terjadi kesalahan, coba lagi nanti." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Ikon Chatbot */}
      <div
        className="flex items-center justify-center bg-blue-500 rounded-full p-3 cursor-pointer hover:bg-blue-600"
        onClick={toggleChat}
      >
        <FaRobot size={24} color="white" />
      </div>

      {/* Kotak Chat */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white shadow-lg rounded-lg p-4">
          <div className="h-40 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis pesan Anda di sini..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          ></textarea>
          <button
            className="mt-2 w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
            onClick={handleMessageSend}
          >
            Kirim
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
