import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  ref, set, get, update
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

export async function signUpMember({email,password,name,phone}){
  const credential = await createUserWithEmailAndPassword(auth,email,password);
  const uid = credential.user.uid;
  const now = Date.now();

  await set(ref(db, `members/${uid}`), {
    uid,
    email,
    name,
    phone,
    role: "member",
    createdAt: now,
    updatedAt: now
  });

  return credential.user;
}

export async function loginMember(email,password){
  return signInWithEmailAndPassword(auth,email,password);
}

export async function loginAdmin(username, password){
  const normalizedUsername = String(username || "").trim();
  const email = normalizedUsername.includes("@")
    ? normalizedUsername
    : normalizedUsername.toLowerCase() === "admin"
      ? "admin@gmail.com"
      : `${normalizedUsername}@travel.local`;
  const credential = await signInWithEmailAndPassword(auth, email, password);
  let member = await getMember(credential.user.uid);
  if (!member && credential.user.email?.toLowerCase() === "admin@gmail.com") {
    const now = Date.now();
    member = {
      uid: credential.user.uid,
      email: credential.user.email,
      name: "관리자",
      phone: "",
      role: "admin",
      createdAt: now,
      updatedAt: now
    };
    await set(ref(db, `members/${credential.user.uid}`), member);
  }
  if (!member || member.role !== "admin") {
    await signOut(auth);
    const error = new Error("관리자 권한이 없습니다.");
    error.code = "admin-role-missing";
    throw error;
  }
  return credential.user;
}

export async function logoutMember(){
  return signOut(auth);
}

export function watchAuth(callback){
  return onAuthStateChanged(auth, callback);
}

export async function getMember(uid){
  const snap = await get(ref(db, `members/${uid}`));
  return snap.exists() ? snap.val() : null;
}

export async function updateMember(uid, data){
  await update(ref(db, `members/${uid}`), {
    ...data,
    updatedAt: Date.now()
  });
}
