import { db } from "./firebase-config.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

export function calculateNights(checkIn, checkOut){
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end - start;
  return diff > 0 ? Math.ceil(diff / 86400000) : 0;
}

export function calculateTotal(pricePerNight, rooms, nights){
  return Number(pricePerNight) * Number(rooms) * Number(nights);
}

export async function createReservation(data){
  const reservationRef = push(ref(db, "reservations"));
  const id = reservationRef.key;
  const now = Date.now();

  await set(reservationRef, {
    id,
    ...data,
    status: "pending",
    createdAt: now,
    updatedAt: now
  });

  return id;
}
