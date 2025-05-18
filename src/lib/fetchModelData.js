const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

export default async function fetchModel(path) {
  const res = await fetch(`${BACKEND_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}