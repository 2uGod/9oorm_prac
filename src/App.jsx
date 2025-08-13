import React from "react";
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
  );
}

export default App;
