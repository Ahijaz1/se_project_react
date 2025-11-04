import { checkResponse } from "./api.js";
import { BASE_URL } from "./constants.js";

// Centralized request function to eliminate duplication
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const signup = function ({ name, avatar, email, password }) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const signin = function ({ email, password }) {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkAuth = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
