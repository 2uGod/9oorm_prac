import React from "react";
<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PostCreate from "./pages/PostCreate";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 진입은 커뮤니티 목록으로 */}
        <Route path="/" element={<Navigate to="/post" replace />} />

        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp />} />

        {/* 커뮤니티 목록 */}
        <Route path="/post" element={<PostList />} />

        {/* 글 작성 */}
        <Route path="/post/new" element={<PostCreate />} />

        {/* 글 상세 (댓글 포함) */}
        <Route path="/post/:id" element={<PostDetail />} />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 16 }}>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </BrowserRouter>
>>>>>>> 3fd7212447b3a40c40e22c2a5b8a316a2c1d2700
  );
}

export default App;
