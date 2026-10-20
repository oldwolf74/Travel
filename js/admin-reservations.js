import { requireAdmin, readCollection, updateRecord } from "./admin-common.js?v=20261021";

requireAdmin();
const rows = document.querySelector("#reservation-rows");
const message = document.querySelector("#crud-message");
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
async function load() {
  try {
    const items = await readCollection("reservations");
    rows.innerHTML = items.length ? items.sort((a,b) => Number(b.createdAt||0)-Number(a.createdAt||0)).map(item => `<tr><td>${escapeHtml(item.guestName || item.memberId || "-")}</td><td>${escapeHtml(item.stayId || "-")}</td><td>${escapeHtml(item.checkIn || "-")} ~ ${escapeHtml(item.checkOut || "-")}</td><td>${Number(item.guests || 0)}명</td><td><select data-status="${escapeHtml(item.id)}"><option value="pending" ${item.status==='pending'?'selected':''}>pending</option><option value="confirmed" ${item.status==='confirmed'?'selected':''}>confirmed</option><option value="cancelled" ${item.status==='cancelled'?'selected':''}>cancelled</option><option value="completed" ${item.status==='completed'?'selected':''}>completed</option></select></td><td><button class="table-actions" data-save="${escapeHtml(item.id)}">저장</button></td></tr>`).join("") : '<tr><td colspan="6" class="empty-row">등록된 예약이 없습니다.</td></tr>';
    rows.querySelectorAll("[data-save]").forEach(button => button.addEventListener("click", async () => { const select = rows.querySelector(`[data-status="${button.dataset.save}"]`); await updateRecord("reservations", button.dataset.save, { status: select.value }); message.textContent = "예약 상태가 저장되었습니다."; }));
  } catch (error) { rows.innerHTML = '<tr><td colspan="6" class="empty-row">예약을 불러오지 못했습니다.</td></tr>'; console.error(error); }
}
load();
