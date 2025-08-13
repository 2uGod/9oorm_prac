import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [student, setStudent] = useState(false);
  const [worker, setWorker] = useState(false);
  const isActive = student || worker;

  return (
    <div className="container">
      <div className="sub-header">
        <span className="back-btn">{"<"}</span>
        <span className="title">회원가입</span>
        <span style={{ width: 20 }}></span>
      </div>

      <div className="options">
        <div className="option">
          <span className="option-text">학생입니다</span>
          <input
            type="checkbox"
            checked={student}
            onChange={(e) => setStudent(e.target.checked)}
            className="checkbox"
          />
        </div>

        <div className="option">
          <span className="option-text long">직장인 / 프리랜서 입니다</span>
          <input
            type="checkbox"
            checked={worker}
            onChange={(e) => setWorker(e.target.checked)}
            className="checkbox"
          />
        </div>
      </div>

      <div className="btn-wrapper">
        <button
          disabled={!isActive}
          className={`next-btn ${isActive ? "active" : ""}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
