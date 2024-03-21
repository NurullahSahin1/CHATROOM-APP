import React from "react";

const RoomPage = ({ setRoom, setIsAuth }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const room = e.target[0].value;

    setRoom(room.toLowerCase());
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz</p>
      <input type="text" placeholder="ör:haftaiçi" />
      <button type="submit">Odaya Gir</button>
      <button
        onClick={() => {
          //Çıkış yap'a basılınca giriş sayfasına yönlendirir.
          setIsAuth(false);
          //Local'deki kaydı kaldırır
          localStorage.removeItem("TOKEN");
        }}
        type="button"
      >
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
