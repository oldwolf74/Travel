import { watchAuth, getMember, logoutMember } from "./auth.js";

const list = document.querySelector("#destination-list");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const backToTop = document.querySelector(".back-to-top");
const navLogin = document.querySelector(".nav-login");
const navSignup = document.querySelector(".nav-signup");
const navAdmin = document.querySelector(".nav-admin");
const navReservation = document.querySelector(".nav-reservation");
const navLogout = document.querySelector(".nav-logout");
const navAdminLogout = document.querySelector(".nav-admin-logout");
const sampleDestinations = [
  { id: "jeju", name: "제주도", summary: "바람과 바다가 머무는 섬", icon: "🌴" },
  { id: "gangneung", name: "강릉", summary: "커피와 파도, 느린 오후", icon: "☕", imageUrl: "https://www.telltrip.com/wp-content/uploads/2025/02/Jeongdong-Simgok-Sea-Fan-Road-3.jpg" },
  { id: "busan", name: "부산", summary: "도시와 바다가 만나는 곳", icon: "🌊" },
  { id: "yeosu", name: "여수", summary: "밤바다를 따라 걷는 여행", icon: "🌙" },
  { id: "jeonju", name: "전주", summary: "골목마다 피어나는 맛과 멋", icon: "🏮" },
  { id: "sokcho", name: "속초", summary: "산과 바다를 한 번에", icon: "⛰️" }
];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function renderDestinations(items) {
  list.innerHTML = items.slice(0, 6).map((destination, index) => {
    const image = destination.imageUrl || destination.image;
    const imageStyle = image ? ` style="background-image:linear-gradient(180deg,rgba(20,62,55,.04),rgba(20,62,55,.58)),url('${escapeHtml(image)}');background-size:cover;background-position:center"` : "";
    return `<a class="destination-card" href="html/destination-detail.html?id=${encodeURIComponent(destination.id || destination.name)}"${imageStyle}><span class="destination-art" aria-hidden="true">${escapeHtml(destination.icon || ["🌴", "☕", "🌊", "🌙", "🏮", "⛰️"][index])}</span><span class="destination-arrow" aria-hidden="true">↗</span><span class="destination-overlay"><h3>${escapeHtml(destination.name)}</h3><p>${escapeHtml(destination.summary || "새로운 풍경을 만나는 여행")}</p></span></a>`;
  }).join("");
}

async function loadDestinations() {
  renderDestinations(sampleDestinations);
  try {
    const { fetchDestinations } = await import("./destinations.js");
    const destinations = await Promise.race([
      fetchDestinations(),
      new Promise((resolve) => setTimeout(() => resolve([]), 2500))
    ]);
    if (destinations.length) renderDestinations(destinations);
  } catch (error) {
    console.info("Firebase 데이터가 없어 샘플 여행지를 표시합니다.", error);
    renderDestinations(sampleDestinations);
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

function setNavVisible(element, visible) {
  element?.classList.toggle("is-visible", visible);
}

async function updateAuthNavigation(user) {
  const member = user ? await getMember(user.uid).catch(() => null) : null;
  const isAdmin = member?.role === "admin";
  const isMember = Boolean(user) && !isAdmin;
  if (navAdmin) navAdmin.href = isAdmin ? "admin.html" : "html/admin-login.html";
  setNavVisible(navLogin, !user);
  setNavVisible(navSignup, !user);
  setNavVisible(navAdmin, !user || isAdmin);
  setNavVisible(navReservation, !isAdmin);
  setNavVisible(navLogout, isMember);
  setNavVisible(navAdminLogout, isAdmin);
}

let authState = null;
watchAuth(async (user) => {
  authState = user;
  await updateAuthNavigation(user);
});

navReservation?.addEventListener("click", (event) => {
  if (!authState) {
    event.preventDefault();
    alert("로그인후 예약하시오");
  }
});

navLogout?.addEventListener("click", async () => {
  await logoutMember();
  alert("로그아웃되었습니다");
  updateAuthNavigation(null);
});
navAdminLogout?.addEventListener("click", async () => {
  await logoutMember();
  alert("로그아웃되었습니다");
  updateAuthNavigation(null);
});

document.querySelector("#travel-search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const destination = new FormData(event.currentTarget).get("destination");
  const query = destination ? `?q=${encodeURIComponent(destination)}` : "";
  window.location.href = `html/destinations.html${query}`;
});

function updateBackToTop() {
  backToTop?.classList.toggle("is-visible", window.scrollY > 120);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
updateBackToTop();

loadDestinations();
