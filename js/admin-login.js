import { loginAdmin, watchAuth, getMember } from "./auth.js";

if (location.search) {
  history.replaceState(null, "", location.pathname);
}

watchAuth(async (user) => {
  if (!user) return;
  const member = await getMember(user.uid).catch(() => null);
  if (member?.role === "admin") {
    location.href = "../admin.html";
  }
});

document.querySelector("#admin-login-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const error = document.querySelector("#admin-error");
  error.textContent = "";
  try {
    await loginAdmin(form.get("username"), form.get("password"));
    alert("관리자 로그인 성공");
    location.href = "../admin.html";
  } catch (err) {
    if (err.code === "admin-role-missing") {
      error.textContent = "로그인은 되었지만 관리자 권한이 없습니다. members/{uid}/role 값을 admin으로 설정하세요.";
      alert("관리자 권한이 없습니다.");
    } else if (err.code === "PERMISSION_DENIED" || /Permission denied/i.test(err.message || "")) {
      error.textContent = "Firebase Realtime Database 보안 규칙에서 관리자 권한 조회가 차단되었습니다.";
      alert("Firebase Database 보안 규칙을 확인하세요.");
    } else if (["auth/user-not-found", "auth/invalid-credential", "auth/wrong-password"].includes(err.code)) {
      error.textContent = "Firebase Authentication의 관리자 이메일 또는 비밀번호가 일치하지 않습니다.";
      alert("관리자 로그인 실패: Firebase 계정을 확인하세요.");
    } else {
      error.textContent = "관리자 로그인 처리 중 오류가 발생했습니다.";
      alert("관리자 로그인 실패");
    }
    console.error(err);
  }
});
