import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostCreate.css";
import { addPost } from "../lib/postStore";

// 파일을 dataURL로 변환
function filesToDataUrls(files) {
  const arr = Array.from(files || []);
  return Promise.all(
    arr.map(
      (f) =>
        new Promise((res, rej) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result);
          fr.onerror = rej;
          fr.readAsDataURL(f);
        })
    )
  );
}

export default function PostCreate() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [picked, setPicked] = useState([]); // File[]
  const [submitting, setSubmitting] = useState(false);
  const max = 10;

  const onPick = (e) => {
    const next = [...picked, ...Array.from(e.target.files || [])].slice(0, max);
    setPicked(next);
  };
  const removeAt = (i) => setPicked((prev) => prev.filter((_, idx) => idx !== i));

  const canSubmit = !submitting && title.trim() && body.trim();

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const images = await filesToDataUrls(picked);
      addPost({
        author: "김안녕", // 로그인 사용자명으로 교체 가능
        title: title.trim(),
        body: body.trim(),
        images,
      });
      // ✅ 작성 후 목록으로 이동
      nav("/post", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fu-viewport fu-viewport--fixed">
      <div className="fu-container">
        <form onSubmit={submit} className="fu-card fu-create">
          <h1 className="fu-title">게시물 등록</h1>

          <input
            className="fu-input"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="fu-textarea"
            placeholder="내용을 입력해주세요."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="fu-uploader">
            <label className="fu-label">이미지 업로드 ({picked.length}/{max})</label>
            <input type="file" accept="image/*" multiple onChange={onPick} />
            {!!picked.length && (
              <div className="fu-grid">
                {picked.map((f, i) => (
                  <div key={i} className="fu-cell">
                    <img className="fu-img" src={URL.createObjectURL(f)} alt="" />
                    <button type="button" className="fu-del" onClick={() => removeAt(i)}>
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="fu-actions">
            <button className="fu-btn fu-btn--dark" disabled={!canSubmit}>
              {submitting ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
