// import { initializeApp } from "firebase/app";

// import {} from "./firestore";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0GPHjNlKNIWWZckGPtWsMU2LbpMztd_M",
  authDomain: "modern-js-bcf3a.firebaseapp.com",
  projectId: "modern-js-bcf3a",
  storageBucket: "modern-js-bcf3a.appspot.com",
  messagingSenderId: "113709262359",
  appId: "1:113709262359:web:8a454f64ff80eeacf4de52",
  measurementId: "G-972DVPQ0LK",
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore(app);

const chatsRef = collection(db, "chats");

// get collection data
// getDocs(chatsCol)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((error) => console.log(error));

// onSnapshot(chatsCol, (snapshot) => {
//   let books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(books);
// });

// addDoc(chatsCol, {
//   message: "nigga",
//   room: "general",
//   username: "eri",
// });

export class Chatroom {
  constructor(room, username) {
    (this.room = room),
      (this.username = username),
      (this.chats = chatsRef),
      this.unsub;
  }
  async addChat(message) {
    // const now = new Date();
    // console.log(`created_at: ${now}`)
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: new Date(),
    };
    const response = await addDoc(this.chats, chat);
    return response;
  }
  getChats(callback) {
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          callback(change.doc.data());
        }
      });
    });
  }
  updateUsername(username) {
    this.username = username;
    localStorage.setItem("username", this.username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("Room changed to " + this.room);
    this.unsub ? this.unsub() : null;
  }
}
