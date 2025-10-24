import { useNavigate } from "react-router-dom";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

const RegisterModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  onLogin,
  isLoading,
}) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation check
    if (!values.email || !values.password || !values.name || !values.avatar) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit(values)
      .then(() => {
        handleCloseModal();
        resetForm();
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          alert(
            "Cannot connect to server. Please make sure the backend server is running on http://localhost:3001"
          );
        } else {
          alert("Registration failed: " + error.message);
        }
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Registering..." : "Next"}
      onClose={handleCloseModal}
      isOpen={isOpen}
      formValid={true}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL *{" "}
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Sign Up
        </button>
        <button className="modal__to-login" type="button" onClick={onLogin}>
          <span className="modal__login-button-text">or Log In</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
