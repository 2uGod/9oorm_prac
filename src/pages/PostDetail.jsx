import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PostDetail.css";
import { getPostById, formatWhen } from "../lib/postStore";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const post = useMemo(() => (id ? getPostById(id) : null), [id]);

  useEffect(() => {
    if (!post) nav("/post", { replace: true });
  }, [post, nav]);

  // 댓글 로컬 저장
  const storageKey = `post-comments:${id}`;
  const [comments, setComments] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const [text, setText] = useState("");
  const addComment = () => {
    const body = text.trim();
    if (!body) return;
    setComments((prev) => [{ id: Date.now(), author: "나", body, time: "방금 전" }, ...prev]);
    setText("");
  };

  if (!post) return null;

  return (
    <div className="pd-viewport pd-viewport--fixed">
      <div className="pd-container">
        <article className="pd-card">
          <header className="pd-topbar">
            <button onClick={() => nav(-1)} className="pd-btn">← 목록으로</button>
          </header>

          <section className="pd-head">
            <div className="pd-avatar" />
            <div>
              <div className="pd-name">{post.author}</div>
              <div className="pd-time">{formatWhen(post.createdAt)}</div>
            </div>
          </section>

          <h1 className="pd-title">{post.title}</h1>
          {post.thumb && <img className="pd-hero" src={post.thumb} alt="" />}
          <p className="pd-body">{post.body}</p>

          <section className="pd-comments">
            <h2 className="pd-subtitle">댓글</h2>
            <div className="pd-write">
              <input
                className="pd-input"
                placeholder="댓글을 입력해주세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
              />
              <button onClick={addComment} className="pd-btn pd-btn--dark">전송</button>
            </div>

            <ul className="pd-list">
              {comments.length === 0 && <li className="pd-empty">첫 댓글을 남겨보세요.</li>}
              {comments.map((c) => (
                <li key={c.id} className="pd-item">
                  <div className="pd-item__meta">
                    <span className="pd-author">{c.author}</span>
                    <span className="pd-cmt-time">{c.time ?? ""}</span>
                  </div>
                  <p className="pd-cmt-body">{c.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
