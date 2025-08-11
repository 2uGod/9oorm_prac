import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="logo">LOGO</div>
      <div className="input-group">
        <label>닉네임을 입력해주세요</label>
        <input type="text" placeholder="닉네임" />
      </div>

      <div className="input-group">
        <label>비밀번호를 입력해주세요</label>
        <input type="password" placeholder="비밀번호" />
      </div>

      <p className="error">닉네임과 비밀번호를 확인해주세요</p>

      <button className="login-button">접속하기</button>

      <div className="signup">계정 생성하기 {">"}</div>
    </div>
  );
}

export default App;
