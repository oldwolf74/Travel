import { requireAdmin, readCollection, deleteRecord } from "./admin-common.js?v=20261021";

requireAdmin();
const rows = document.querySelector("#destination-rows");
const message = document.querySelector("#crud-message");
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

async function load() {
  try {
    const items = await readCollection("destinations");
    rows.innerHTML = items.length ? items.map(item => `<tr><td><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.id)}</small></td><td>${escapeHtml(item.region || "-")}</td><td>${escapeHtml(item.summary || "-")}</td><td><div class="table-actions"><a href="./admin-destination-form.html?id=${encodeURIComponent(item.id)}">수정</a><button class="danger" data-delete="${escapeHtml(item.id)}">삭제</button></div></td></tr>`).join("") : '<tr><td colspan="4" class="empty-row">등록된 여행지가 없습니다.</td></tr>';
    rows.querySelectorAll("[data-delete]").forEach(button => button.addEventListener("click", async () => { if (!confirm("이 여행지를 삭제하시겠습니까?")) return; await deleteRecord("destinations", button.dataset.delete); message.textContent = "삭제되었습니다."; load(); }));
  } catch (error) { rows.innerHTML = '<tr><td colspan="4" class="empty-row">데이터를 불러오지 못했습니다. Firebase 보안 규칙을 확인하세요.</td></tr>'; console.error(error); }
}
load();
