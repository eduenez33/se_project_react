import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleSignUpClick,
  handleLogInClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
          className="header__avatar"
        />
      );
    } else {
      return (
        <div className="header__avatar header__avatar-placeholder">
          {getFirstLetter(userName)}
        </div>
      );
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="What to Wear" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__mobile-menu">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                {renderAvatar()}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__register-btn"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-btn"
              onClick={handleLogInClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
