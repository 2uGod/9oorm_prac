// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

import PostCreate from "./pages/PostCreate";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import SignUp from "./pages/SignUp";

// ★ 로그인 화면을 별도 컴포넌트로 분리 (원래 상단의 마크업 이동)
function Login() {
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

      {/* 필요 시 조건부 렌더링으로 바꾸세요 */}
      <p className="error">닉네임과 비밀번호를 확인해주세요</p>

      <button className="login-button">접속하기</button>

      <div className="signup">
        <Link to="/signup">계정 생성하기 &gt;</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 진입은 커뮤니티 목록으로 */}
        <Route path="/" element={<Navigate to="/post" replace />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} />

        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp />} />

        {/* 커뮤니티 목록 */}
        <Route path="/post" element={<PostList />} />

        {/* 글 작성 */}
        <Route path="/post/new" element={<PostCreate />} />

        {/* 글 상세 (댓글 포함) */}
        <Route path="/post/:id" element={<PostDetail />} />

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 16 }}>페이지를 찾을 수 없습니다.</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
