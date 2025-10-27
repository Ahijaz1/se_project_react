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

// Centralized request function to eliminate duplication
function request(url, options) {
  return fetch(url, options).then(_checkResponse);
}

/* Get items is the only public GET that runs on page load */
export function getItems() {
  return request(`${BASE_URL}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

/* Create item */
function createItem(data, token) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Legacy function for backward compatibility
function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return createItem({ name, imageUrl, weather }, token);
}

/* Delete item */
function deleteItem(itemId, token) {
  return request(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

// Legacy function for backward compatibility
function deleteItemLegacy(id) {
  const token = localStorage.getItem("jwt");
  return deleteItem(id, token);
}

/**
 * Authentication functions (public endpoints)
 */
function addUser({ email, password, name, avatar }) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, name, avatar }),
    headers: { "Content-Type": "application/json" },
  });
}

function login({ email, password }) {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

/* Get current user */
function getCurrentUser(token) {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

// Legacy function for backward compatibility
function jwtBearer(token) {
  return getCurrentUser(token);
}

/* Like item */
function likeItem(itemId, token) {
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

/* Unlike item */
function unlikeItem(itemId, token) {
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

// Legacy functions for backward compatibility
function like(id) {
  const token = localStorage.getItem("jwt");
  return likeItem(id, token);
}

function unlike(id) {
  const token = localStorage.getItem("jwt");
  return unlikeItem(id, token);
}

/* Update profile */
function updateProfile(data, token) {
  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Legacy function for backward compatibility
function updateProfileLegacy({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  return updateProfile({ name, avatar }, token);
}

// Export all functions (new pattern + legacy compatibility)
export {
  // New pattern exports (accept token parameter)
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
  getCurrentUser,
  updateProfile,

  // Legacy exports (use localStorage)
  addItem,
  deleteItemLegacy as deleteItemOld,
  addUser,
  login,
  jwtBearer,
  like,
  unlike,
  updateProfileLegacy as updateProfileOld,
};
