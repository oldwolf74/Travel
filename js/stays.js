import { db } from "./firebase-config.js";
import { ref, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

export async function fetchStays(){
  const snap = await get(ref(db, "stays"));
  return snap.exists() ? Object.values(snap.val()) : [];
}

export async function fetchStaysByDestination(destinationId){
  const q = query(ref(db, "stays"), orderByChild("destinationId"), equalTo(destinationId));
  const snap = await get(q);
  return snap.exists() ? Object.values(snap.val()) : [];
}
