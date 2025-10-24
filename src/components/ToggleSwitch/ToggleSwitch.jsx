import "./ToggleSwitch.css";

export default function ToggleSwitch({ currentUnit, onToggle }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={onToggle}
        checked={currentUnit === "C"}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          currentUnit === "F" ? "toggle-switch__text_color_white" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          currentUnit === "C" ? "toggle-switch__text_color_white" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
