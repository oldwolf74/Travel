import { db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

export async function fetchDestinations(){
  const snap = await get(ref(db, "destinations"));
  if(!snap.exists()) return [];
  return Object.values(snap.val());
}
