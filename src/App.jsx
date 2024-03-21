import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  //kullanıcının seçtiği oda
  const [room, setRoom] = useState(null);
  //kullanıcının yetkisi var mı?
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"));

  //yetkisi yoksa giriş sayfasına yönlendir
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }
  return (
    <div className="container">
      {!room ? (
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      ) : (
        <ChatPage room={room} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
