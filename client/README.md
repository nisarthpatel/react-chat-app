# Real-Time Chat App

A responsive, real-time chat application built with React and Socket.IO. This app allows users to join chat rooms, send messages instantly, and enjoy a smooth, real-time messaging experience with a simple and intuitive interface.

## 🚀 Features

**Room-based Chat**: Create or join chat rooms using unique room IDs.

**Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.

**Real-Time Messaging**: Exchange messages in real-time using Socket.IO.

**Responsive Design**: Smooth, adaptable design for both desktop and mobile users.

**Automatic Room ID Generation**: Quickly generate unique room IDs with one click, copied to the clipboard.

**User Identification**: Messages display the sender’s username and timestamp.

## 🛠️ Technologies Used

**React**: For building the user interface.

**Socket.IO**: For real-time, bidirectional communication between the client and server.

**Vite**: A fast front-end build tool for development.
Tailwind CSS: For styling and responsive design.

**React Scroll-to-Bottom**: For smooth auto-scrolling in the chat window.

## ⚙️ Setup and Installation

## Prerequisites

Ensure you have Node.js and npm installed on your machine.
Install the required dependencies by running the following command in your terminal:

## Installation Steps

Clone the Repository:

git clone https://github.com/nisarthpatel/react-chat-app.git

**Navigate to the project directory:**

`cd chat-app`

Install Dependencies for Client and Server:

Client:

`cd client`

`npm install`

**Server**: Open a new terminal window, navigate to the server directory, and install dependencies:

`cd ../server`

`npm install`
**Start the Server:**

Start the server from the server directory. By default, it listens on http://localhost:5001.

`npm run dev`

Running the Client:

Start the client from the client directory using Vite:

`npm run dev`

Once both the server and client are running, open your browser and go to the URL displayed in the client terminal (usually http://localhost:3000). In this project we have client port set to 4000.

You should now be able to interact with the chat application.

## 🔑 Key Code Highlights

### Random Room ID Generation:

```
const generateRandomId = () => {
const STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let ID = "";
for (let i = 0; i < RANDOM_ID_LENGTH; i++) {
ID += STR.charAt(Math.floor(Math.random() \* STR.length));
}
navigator.clipboard.writeText(ID);
setRoomId(ID);
alert(`Copied to clipboard: ${ID}`);
};
```

### Send Message with Timestamp:

```
const sendMessage = () => {
const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
socket.emit("sendMessage", { roomId, text: messageText, author: username, time });
setMessageText("");
};
```

📜 License
This project is licensed under the MIT License. See the [LICENSE.md](Licence.md) file for more details.

# 🌟 Future Enhancements

- **Implement user** authentication and authorization.

- **Typing Indicators**: Show when a user is typing.
- **Message Persistence**: Store and retrieve past messages when rejoining a room.
- **Enhanced UI/UX**: Improve the design for a better user experience.
- **Room Sharing Links**: Generate shareable URLs for easy room access.
