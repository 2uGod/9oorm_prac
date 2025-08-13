// pages/SignUp.jsx
import { useState } from "react";
import "../styles/SignUp.css";

export default function SignUp() {
  const [org, setOrg] = useState("");
  const [nick, setNick] = useState("");
  const [nickStatus, setNickStatus] = useState(null);
  const [pw, setPw] = useState("");

  const canSubmit = org && nickStatus === "ok" && pw.length >= 8;

  const checkNick = () => {
    if (nick.trim() === "김안녕") setNickStatus("dup");
    else if (nick.trim().length >= 2) setNickStatus("ok");
    else setNickStatus(null);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    alert("회원가입 완료(데모)");
  };

  return (
    <div className="su-viewport su-viewport--fixed">
      <div className="su-container">
        <form onSubmit={submit} className="su-card" aria-labelledby="signupTitle">
          <h1 id="signupTitle" className="su-title">회원가입</h1>

          <div className="su-field">
            <label className="su-label">소속을 입력해주세요</label>
            <div className="su-row">
              <input
                className="su-input"
                placeholder="○○대학교 / ○○회사"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
              <button type="button" className="su-btn su-btn--dark">검색</button>
            </div>
          </div>

          <div className="su-field">
            <label className="su-label">닉네임을 입력해주세요</label>
            <div className="su-row">
              <input
                className="su-input"
                placeholder="닉네임"
                value={nick}
                onChange={(e) => { setNick(e.target.value); setNickStatus(null); }}
              />
              <button type="button" onClick={checkNick} className="su-btn su-btn--dark">중복확인</button>
            </div>
            {nickStatus === "dup" && <p className="su-help su-help--error">중복된 닉네임입니다</p>}
            {nickStatus === "ok" && <p className="su-help su-help--ok">사용 가능한 닉네임입니다</p>}
          </div>

          <div className="su-field">
            <label className="su-label">비밀번호를 입력해주세요</label>
            <input
              className="su-input"
              type="password"
              placeholder="8자 이상"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          <button className="su-submit su-btn su-btn--dark" disabled={!canSubmit}>완료</button>
        </form>
      </div>
    </div>
  );
}
