import { requireAdmin, readCollection, deleteRecord } from "./admin-common.js?v=20261021";

requireAdmin();
const rows = document.querySelector("#stay-rows");
const message = document.querySelector("#crud-message");
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

async function load() {
  try {
    const items = await readCollection("stays");
    rows.innerHTML = items.length ? items.map(item => `<tr><td><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.id)}</small></td><td>${escapeHtml(item.destinationId || "-")}</td><td>${escapeHtml(item.address || "-")}</td><td>${Number(item.pricePerNight || 0).toLocaleString()}원/박</td><td><div class="table-actions"><a href="./admin-stay-form.html?id=${encodeURIComponent(item.id)}">수정</a><button class="danger" data-delete="${escapeHtml(item.id)}">삭제</button></div></td></tr>`).join("") : '<tr><td colspan="5" class="empty-row">등록된 숙소가 없습니다.</td></tr>';
    rows.querySelectorAll("[data-delete]").forEach(button => button.addEventListener("click", async () => { if (!confirm("이 숙소를 삭제하시겠습니까?")) return; await deleteRecord("stays", button.dataset.delete); message.textContent = "삭제되었습니다."; load(); }));
  } catch (error) { rows.innerHTML = '<tr><td colspan="5" class="empty-row">데이터를 불러오지 못했습니다. Firebase 보안 규칙을 확인하세요.</td></tr>'; console.error(error); }
}
load();
