import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggleSwitch__label">
      <input
        className="toggleSwitch__input"
        type="checkbox"
        name="unit_preference"
        checked={currentTemperatureUnit === "F"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggleSwitch__text toggleSwitch__text_type_f">F</span>
      <span className="toggleSwitch__text toggleSwitch__text_type_c">C</span>
      <span className="toggleSwitch__switch" />
    </label>
  );
}

export default ToggleSwitch;
