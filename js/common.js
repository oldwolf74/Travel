export function getQueryParam(name){
  return new URLSearchParams(window.location.search).get(name);
}

export function formatPrice(value){
  return Number(value || 0).toLocaleString("ko-KR") + "원";
}

export function formatDateTime(timestamp){
  if(!timestamp) return "-";
  return new Date(timestamp).toLocaleString("ko-KR");
}
