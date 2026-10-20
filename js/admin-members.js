import { requireAdmin, readCollection } from "./admin-common.js?v=20261021";

requireAdmin();
const rows = document.querySelector("#member-rows");
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const formatDate = value => value ? new Date(Number(value)).toLocaleDateString("ko-KR") : "-";
async function load() { try { const items = await readCollection("members"); rows.innerHTML = items.length ? items.map(item => `<tr><td>${escapeHtml(item.name || "-")}</td><td>${escapeHtml(item.email || "-")}</td><td>${escapeHtml(item.phone || "-")}</td><td>${escapeHtml(item.role || "member")}</td><td>${formatDate(item.createdAt)}</td></tr>`).join("") : '<tr><td colspan="5" class="empty-row">가입 회원이 없습니다.</td></tr>'; } catch (error) { rows.innerHTML = '<tr><td colspan="5" class="empty-row">회원 정보를 불러오지 못했습니다.</td></tr>'; console.error(error); } }
load();
