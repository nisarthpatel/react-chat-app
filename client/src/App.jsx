import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
const socket = io("http://localhost:5001");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const RANDOM_ID_LENGTH = 8;


  const generateRandomId = () => {
    const STR =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ID = "";
    for (let i = 0; i < RANDOM_ID_LENGTH; i++) {
      ID += STR.charAt(Math.floor(Math.random() * STR.length));
    }
    navigator.clipboard.writeText(ID);
    setRoomId(ID);
    alert(`Copied to keyboard: ${ID}  `)
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    socket.emit("sendMessage", {
      roomId: roomId,
      text: messageText,
      author: username,
      time: time,
    });
    setMessageText("");
  };
  const joinRoom = () => {
    socket.emit("joinRoom", { roomId });
    setShowChat(true);
  };
  return (
    <div style={{ justifyItems: "center", marginTop: "100px" }}>
      <div className="flex flex-col">
        {!showChat && (
          <div>
            <h1
              style={{
                textAlign: "center",
                margin: "20px",
                fontFamily: "fantasy",
                fontSize: "30px",
              }}
            >
              Real-Time Chat App
            </h1>
            <h4 className="m-2 font-semibold text-lg text-center">
              Create Room
            </h4>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Enter Your Room ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
            />
            <button
              onClick={generateRandomId}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2 w-full"
            >
              Generate Random ID
            </button>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2 w-full"
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        )}

        {showChat && (
          <div>
            <h1 className="font-semibold font text-4xl m-4">Live Chat</h1>
            <ScrollToBottom className="h-96 w-64 border border-spacing-10 rounded mb-3 overflow-y-auto">
              {messages.map((message, index) => {
                const isAuthor = message.author === username;
                return (
                  <div key={index} className={`mb-4 px-4 flex ${isAuthor ? 'justify-end' : 'justify-start'}`}>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        <strong className="text-gray-800">{message.author}</strong>
                        <span className="text-gray-400 text-xs"> ({message.time})</span>
                      </div>
                      <div
                        className={`${isAuthor ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-800'} p-3 rounded-lg max-w-3/4 break-words`}
                        style={{ wordWrap: 'break-word' }}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2 w-full"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        )
        }
      </div >
    </div >
  );
};

export default App;
