import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data.user);

      // kullanıcı yetkisini true'ya çek
      setIsAuth(true);

      // kullanıcı bilgilerini localde sakla
      localStorage.setItem("TOKEN", data.user.refreshToken);
    });
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" alt="" />
          <span>Google İle Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
