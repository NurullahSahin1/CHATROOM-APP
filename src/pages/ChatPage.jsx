import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { serverTimestamp, query, where, orderBy } from "firebase/firestore";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const sendMessage = async (e) => {
    e.preventDefault();

    const messagesCol = collection(db, "messages");

    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    e.target.reset();
  };

  useEffect(() => {
    //kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // anlık olarak mesajlar kolleksiyonundaki verileri al. Kolleksiyon her değiştiğinde verdiğimiz fonksiyon ile kolleksiyonlardaki tüm dokümanlara erişiriz.

    const q = query(
      messagesCol,
      where("room", "==", room, orderBy("createdAt", "asc"))
    );
    onSnapshot(q, (snapshot) => {
      //verilerin geçici olarak tutulacağı boş bir dizi oluştur
      const tempMsg = [];
      //Dokümanları dönüp data verilerine eriş
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });
      setMessages(tempMsg);
    });
  }, []);
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>
      <form onSubmit={sendMessage}>
        <input type="text" required placeholder="mesajınızı yazınız" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
