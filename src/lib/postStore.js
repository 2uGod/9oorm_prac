// 간단한 로컬스토리지 스토어
const STORAGE_KEY = "posts:v1";

// 상대 시간 포맷
export function formatWhen(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금 전";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  return `${d}일 전`;
}

export function getPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setPosts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// 최초 한 번 다양한 더미 데이터 주입
export function ensureSeed() {
  const cur = getPosts();
  if (cur.length) return;

  const seed = [
    {
      id: String(Date.now() - 1),
      author: "김안녕",
      title: "정보통신공학과 진학 준비, 포트폴리오는 어떻게 구성할까요?",
      body: "알고리즘 스터디와 간단한 웹 프로젝트가 있습니다. 어떤 식으로 정리하면 좋을지 조언 부탁드립니다.",
      thumb: `https://picsum.photos/seed/river/960/540`,
      images: [],
      createdAt: Date.now() - 1000 * 60 * 25,
    },
    {
      id: String(Date.now() - 2),
      author: "이파머",
      title: "캡스톤 주제 추천 부탁! 농업 데이터 시각화 어떤가요?",
      body: "농산물 가격 데이터로 대시보드를 만들 생각인데 기술 스택과 참고 자료가 궁금합니다.",
      thumb: `https://picsum.photos/seed/mountain/960/540`,
      images: [],
      createdAt: Date.now() - 1000 * 60 * 80,
    },
    {
      id: String(Date.now() - 3),
      author: "박개발",
      title: "백엔드 공부 로드맵: 스프링 vs Node 중 무엇부터?",
      body: "팀에서 Node를 쓰는데 개인 프로젝트는 스프링도 써보고 싶어요. 선배님들 의견 궁금합니다!",
      thumb: `https://picsum.photos/seed/forest/960/540`,
      images: [],
      createdAt: Date.now() - 1000 * 60 * 180,
    },
    {
      id: String(Date.now() - 4),
      author: "최디자",
      title: "디자인 시스템 도입 경험 공유해주실 분!",
      body: "컴포넌트 토큰 정리와 스토리북 도입을 고민 중입니다. 시행착오가 있었는지 궁금해요.",
      thumb: `https://picsum.photos/seed/city/960/540`,
      images: [],
      createdAt: Date.now() - 1000 * 60 * 400,
    },
  ];
  setPosts(seed);
}

export function addPost({ author = "익명", title, body, images = [] }) {
  const now = Date.now();
  const id = String(now);
  const thumb = images[0] || null;
  const next = [
    {
      id,
      author,
      title,
      body,
      thumb,
      images,
      createdAt: now,
    },
    ...getPosts(),
  ];
  setPosts(next);
  return id;
}

export function getPostById(id) {
  return getPosts().find((p) => p.id === id) || null;
}
