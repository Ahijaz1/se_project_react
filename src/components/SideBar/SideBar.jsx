import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar && currentUser.avatar.trim() !== "" ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={`profile avatar for ${currentUser.name}`}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase() || ""}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        Change profile info
      </button>
      <button className="sidebar__logout-btn" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
