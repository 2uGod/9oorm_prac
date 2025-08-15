// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./App.css";

import PostCreate from "./pages/PostCreate";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import SignUpPage from "./pages/SignUpPage"; 
import SignUp from "./pages/SignUp";         


const AUTH_KEY = "isLoggedIn";

const isLoggedIn = () => localStorage.getItem(AUTH_KEY) === "true";
const doLogin = () => localStorage.setItem(AUTH_KEY, "true");
const doLogout = () => localStorage.removeItem(AUTH_KEY);

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ nickname: "", password: "" });
  const [error, setError] = React.useState("");

  if (isLoggedIn()) return <Navigate to="/post" replace />;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.nickname || !form.password) {
        throw new Error("닉네임과 비밀번호를 모두 입력해주세요.");
      }
      
      doLogin();
      navigate("/post", { replace: true });
    } catch (err) {
      setError(err?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="container">
      <div className="logo">LOGO</div>

      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="nickname">닉네임을 입력해주세요</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={form.nickname}
            onChange={onChange}
            autoComplete="username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">비밀번호를 입력해주세요</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="login-button" type="submit">
          접속하기
        </button>
      </form>

      <div className="signup">
        
        <Link to="/signup">계정 생성하기 &gt;</Link>
      </div>
    </div>
  );
}


function SignupFormRoute() {
  const navigate = useNavigate();

  const handleSuccess = React.useCallback(() => {
    alert("회원가입이 완료되었습니다. 로그인 해주세요.");
    navigate("/login", { replace: true });
  }, [navigate]);

  React.useEffect(() => {

    window.__onSignUpSuccess = handleSuccess;
    return () => {
      delete window.__onSignUpSuccess;
    };
  }, [handleSuccess]);


  return <SignUp onSuccess={handleSuccess} />;
}


function RequireAuth() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
}


function CommunityLayout() {
  const navigate = useNavigate();
  const onLogout = () => {
    doLogout();
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
        <Link to="/post" style={{ marginRight: 12 }}>
          커뮤니티 목록
        </Link>
        <Link to="/post/new" style={{ marginRight: 12 }}>
          글 작성
        </Link>
        <button onClick={onLogout} style={{ float: "right" }}>
          로그아웃
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />


        <Route path="/login" element={<Login />} />


        <Route path="/signup" element={<SignUpPage />} />        {/* 1단계 */}
        <Route path="/signup/form" element={<SignupFormRoute />} /> {/* 2단계 */}

        <Route element={<RequireAuth />}>
          <Route element={<CommunityLayout />}>
            <Route path="/post" element={<PostList />} />
            <Route path="/post/new" element={<PostCreate />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Route>
        </Route>

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
