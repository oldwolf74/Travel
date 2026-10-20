import { auth } from "./firebase-config.js";
import { getMember } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { db } from "./firebase-config.js";
import { get, ref, set, remove, push, update } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

export function requireAdmin({ loginPath = "./admin-login.html", fallbackPath = "../index.html" } = {}){
  onAuthStateChanged(auth, async user => {
    if(!user){
      location.href = loginPath;
      return;
    }
    const member = await getMember(user.uid);
    if(!member || member.role !== "admin"){
      alert("관리자 권한이 필요합니다.");
      location.href = fallbackPath;
    }
  });
}

export async function readCollection(path) {
  const snapshot = await get(ref(db, path));
  if (!snapshot.exists()) return [];
  return Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }));
}

export async function saveRecord(path, id, data) {
  const recordId = id || push(ref(db, path)).key;
  const now = Date.now();
  await set(ref(db, `${path}/${recordId}`), { ...data, id: recordId, updatedAt: now, ...(id ? {} : { createdAt: now }) });
  return recordId;
}

export async function deleteRecord(path, id) {
  await remove(ref(db, `${path}/${id}`));
}

export async function updateRecord(path, id, data) {
  await update(ref(db, `${path}/${id}`), { ...data, updatedAt: Date.now() });
}
