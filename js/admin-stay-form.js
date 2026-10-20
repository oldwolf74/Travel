import { requireAdmin, readCollection, saveRecord } from "./admin-common.js?v=20261021";

requireAdmin();
const form = document.querySelector("#stay-form");
const params = new URLSearchParams(location.search);
const id = params.get("id");
const fields = ["id", "name", "destinationId", "address", "pricePerNight", "availableRooms", "imageUrl", "description"];
const message = document.querySelector("#form-message");

async function load() {
  if (!id) return;
  const item = (await readCollection("stays")).find(value => value.id === id);
  if (!item) return;
  document.querySelector("#form-title").textContent = "숙소 수정";
  fields.forEach(field => { if (form.elements[field]) form.elements[field].value = item[field] ?? ""; });
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  ["pricePerNight", "availableRooms"].forEach(key => { data[key] = Number(data[key] || 0); });
  const recordId = data.id || data.name.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "") || undefined;
  delete data.id;
  try { await saveRecord("stays", recordId, data); alert("숙소가 저장되었습니다."); location.href = "./admin-stays.html"; }
  catch (error) { message.textContent = "저장에 실패했습니다. Firebase 보안 규칙을 확인하세요."; console.error(error); }
});
load().catch(console.error);
