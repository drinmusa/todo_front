export function getAuthToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : "";
}

export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

export function deleteAuthToken() {
  localStorage.removeItem("token");
}
