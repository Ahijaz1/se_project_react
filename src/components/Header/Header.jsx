import "./Header.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function Header({ onAddGarment, weatherData, onSignUp, onLogIn }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  // Get current date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="website logo" src={logo} />
      </Link>
      <p className="header__date_location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch
        currentUnit={currentTemperatureUnit}
        onToggle={handleToggleSwitchChange}
      />

      {isLoggedIn ? (
        <>
          <button
            onClick={onAddGarment}
            type="button"
            className="header__add_clothes"
          >
            + Add Clothes
          </button>

          <Link to="/profile" className="header__user_container">
            <p className="header__username">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar_placeholder">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
        </>
      ) : (
        <div className="header__auth_buttons">
          <button
            onClick={onSignUp}
            type="button"
            className="header__signup_button"
          >
            Sign Up
          </button>
          <button
            onClick={onLogIn}
            type="button"
            className="header__login_button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
