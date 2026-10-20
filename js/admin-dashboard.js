import { db } from "./firebase-config.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { watchAuth, getMember, logoutMember } from "./auth.js";
import { requireAdmin } from "./admin-common.js";

requireAdmin({ loginPath: "html/admin-login.html", fallbackPath: "index.html" });
const status = document.querySelector("#firebase-status");
const name = document.querySelector("#admin-name");
const reservationsBody = document.querySelector("#recent-reservations");

watchAuth(async (user) => {
  if (!user) return;
  const member = await getMember(user.uid).catch(() => null);
  if (member?.name) name.textContent = `${member.name} 관리자`;
  loadDashboard();
});

async function readNode(node) {
  const snapshot = await get(ref(db, node));
  return snapshot.exists() ? snapshot.val() : {};
}
function entries(value) { return Object.values(value || {}); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }

async function loadDashboard() {
  try {
    const [destinations, stays, reservations, members] = await Promise.all([readNode("destinations"), readNode("stays"), readNode("reservations"), readNode("members")]);
    document.querySelector('[data-stat="destinations"]').textContent = entries(destinations).length;
    document.querySelector('[data-stat="stays"]').textContent = entries(stays).length;
    document.querySelector('[data-stat="reservations"]').textContent = entries(reservations).length;
    document.querySelector('[data-stat="members"]').textContent = entries(members).length;
    const recent = entries(reservations).sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0)).slice(0, 6);
    reservationsBody.innerHTML = recent.length ? recent.map((item) => `<tr><td>${escapeHtml(item.guestName || item.memberId || "-")}</td><td>${escapeHtml(item.checkIn || "-")}</td><td>${Number(item.guests || 0)}명</td><td><span class="status status-${escapeHtml(item.status || "pending")}">${escapeHtml(item.status || "pending")}</span></td></tr>`).join("") : '<tr><td colspan="4" class="loading-row">등록된 예약이 없습니다.</td></tr>';
    status.textContent = "Firebase 연결됨";
    status.classList.add("connected");
  } catch (error) {
    status.textContent = "Firebase 연결 실패 - 설정과 보안 규칙을 확인하세요.";
    reservationsBody.innerHTML = '<tr><td colspan="4" class="loading-row">데이터를 불러오지 못했습니다.</td></tr>';
    console.error(error);
  }
}

document.querySelector("#admin-logout")?.addEventListener("click", async () => { await logoutMember(); alert("로그아웃되었습니다"); location.href = "index.html"; });
