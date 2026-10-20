import { watchAuth, getMember } from "./auth.js";
import { createReservation } from "./reservation.js";

let currentUser = null;
watchAuth(async (user) => {
  if (!user) {
    alert("로그인후 예약하시오");
    location.href = "./login.html";
    return;
  }
  currentUser = user;
  const member = await getMember(user.uid).catch(() => null);
  const nameInput = document.querySelector('[name="guestName"]');
  const phoneInput = document.querySelector('[name="guestPhone"]');
  if (member && nameInput && !nameInput.value) nameInput.value = member.name || "";
  if (member && phoneInput && !phoneInput.value) phoneInput.value = member.phone || "";
});

document.querySelector("#reservation-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return alert("로그인후 예약하시오");
  const form = new FormData(event.currentTarget);
  try {
    await createReservation({
      memberId: currentUser.uid,
      stayId: new URLSearchParams(location.search).get("stayId") || "",
      checkIn: form.get("checkIn"), checkOut: form.get("checkOut"),
      guests: Number(form.get("guests")), rooms: Number(form.get("rooms")),
      guestName: form.get("guestName"), guestPhone: form.get("guestPhone")
    });
    alert("예약 신청이 완료되었습니다.");
    location.href = "./reservation-complete.html";
  } catch (error) {
    alert("예약 처리에 실패했습니다.");
    console.error(error);
  }
});
