import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/PostList.css";
import { ensureSeed, getPosts, formatWhen } from "../lib/postStore";

export default function PostList() {
  const [sp] = useSearchParams();
  const q = (sp.get("q") || "").toLowerCase();

  const [list, setList] = useState([]);

  useEffect(() => {
    ensureSeed();
    setList(getPosts());
    // 다른 탭에서 수정될 수 있으니 storage 이벤트도 반영
    const onStorage = (e) => {
      if (e.key === "posts:v1") setList(getPosts());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filtered = useMemo(() => {
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
  }, [list, q]);

  return (
    <div className="pl-viewport pl-viewport--fixed">
      <div className="pl-container">
        <section className="pl-card">
          <header className="pl-head">
            <h1 className="pl-title">Q&amp;A</h1>
            <Link to="/post/new" className="pl-btn pl-btn--dark">
              게시물 등록
            </Link>
          </header>

          {!filtered.length && (
            <p className="pl-empty">검색 결과가 없습니다.</p>
          )}

          <div className="pl-grid">{/* 한 줄에 1개 */}
            {filtered.map((p) => (
              <Link key={p.id} to={`/post/${p.id}`} className="pl-post">
                <div className="pl-post__top">
                  <div className="pl-avatar" />
                  <div className="pl-post__content">
                    <div className="pl-meta">
                      <span className="pl-author">{p.author}</span>
                      <span className="pl-time">{formatWhen(p.createdAt)}</span>
                    </div>
                    <div className="pl-post__title">{p.title}</div>
                    <div className="pl-post__body">{p.body}</div>
                    {p.thumb && <img className="pl-thumb" src={p.thumb} alt="" />}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
