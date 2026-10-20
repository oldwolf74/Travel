import { auth } from "./firebase-config.js";
import { getMember } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

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
