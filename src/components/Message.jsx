import React from "react";
import { auth } from "../firebase/config";

const Message = ({ data }) => {
  //otorumu açık olan kullanıcının id'si mesajı atan kullanıcının id'sine eşitse bunu, değilse başka bir kullanıyı ekrana basacağız
  if (auth.currentUser?.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }

  return (
    <div className="msg-other">
      <div className="user-info">
        <img src={data.author.photo} />
        <span>{data.author.name}</span>
      </div>
      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
Message;
