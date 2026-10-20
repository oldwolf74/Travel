import { requireAdmin, readCollection, saveRecord } from "./admin-common.js?v=20261021";

requireAdmin();
const form = document.querySelector("#destination-form");
const params = new URLSearchParams(location.search);
const id = params.get("id");
const fields = ["id", "name", "region", "summary", "imageUrl", "description"];
const message = document.querySelector("#form-message");

async function load() {
  if (!id) return;
  const item = (await readCollection("destinations")).find(value => value.id === id);
  if (!item) return;
  document.querySelector("#form-title").textContent = "여행지 수정";
  fields.forEach(field => { if (form.elements[field]) form.elements[field].value = item[field] || ""; });
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const recordId = data.id || data.name.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "") || undefined;
  delete data.id;
  try { await saveRecord("destinations", recordId, data); alert("여행지가 저장되었습니다."); location.href = "./admin-destinations.html"; }
  catch (error) { message.textContent = "저장에 실패했습니다. Firebase 보안 규칙을 확인하세요."; console.error(error); }
});
load().catch(console.error);
