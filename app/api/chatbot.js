const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
  
    const response = await fetch("http://127.0.0.1:8000/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
  
    const data = await response.json();
    const botMessage = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  
    setInput("");
  };s