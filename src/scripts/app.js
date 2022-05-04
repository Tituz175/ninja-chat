// importing the Chatroom Class Obj
import { Chatroom } from "./chat.js";

// dom queries
const chatList = document.querySelector(".chat-list");
const buttons = document.querySelector(".chat-rooms");
const newChat = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const nameUpdateMessage = document.querySelector(".update-mssg");

// checking local storage for username
const username = localStorage.username ? localStorage.username : "anon";

// instances of a the chatroom Class
const chatUi = new ChatUI(chatList);
const roomie = new Chatroom("general", username);

newChat.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChat.message.value.trim();
  roomie
    .addChat(message)
    .then(() => {
      newChat.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

newName.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newName.name.value.trim();
  roomie.updateUsername(name);
  // localStorage.setItem("Name",name);
  nameUpdateMessage.innerHTML = `Your name changed to ${name}`;
  setTimeout(() => {
    nameUpdateMessage.innerHTML = "";
  }, 2000);
  newName.reset();
});

// changing of rooms

buttons.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUi.clear();
    const newRoom = e.target.getAttribute("id");
    roomie.updateRoom(newRoom);
    roomie.getChats((data) => {
      chatUi.render(data);
    });
  }
});

// roomie
//   .addChat("Testing 1 2 3")
//   .then(() => {
//     console.log("Chat added");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// console.log(roomie);

roomie.updateRoom("general");

roomie.getChats((data) => {
  console.log(data);
});

roomie.getChats((data) => {
  chatUi.render(data);
});
