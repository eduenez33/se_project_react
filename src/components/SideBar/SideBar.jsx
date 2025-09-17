import { useContext } from "react";

import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const renderAvatar = () => {
    const userName = currentUser?.name || "User";

    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={userName}
          className="sidebar__avatar"
        />
      );
    } else {
      return (
        <div className="sidebar__avatar sidebar__avatar-placeholder">
          {getFirstLetter(userName)}
        </div>
      );
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {renderAvatar()}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <button
        className="sidebar__edit-btn"
        onClick={onEditProfile}
        type="button"
      >
        Change profile data
      </button>
      <button className="sidebar__logout-btn" onClick={onLogout} type="button">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
