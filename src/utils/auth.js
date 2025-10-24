const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function _checkResponse(res) {
  if (res.ok) return res.json();

  // Try to parse as JSON first, fallback to text if it fails
  return res.text().then((text) => {
    try {
      const error = JSON.parse(text);
      return Promise.reject(error);
    } catch (parseError) {
      // If it's not valid JSON, return a structured error with the text
      return Promise.reject({
        message: text || `HTTP ${res.status}: ${res.statusText}`,
        status: res.status,
      });
    }
  });
}

export const signup = function ({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(_checkResponse);
};

export const signin = function ({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

export const checkAuth = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};
