import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

const LoginModal = ({ handleCloseModal, onSubmit, isOpen, onSignUp }) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(values)
      .then(() => {
        handleCloseModal();
        resetForm();
        navigate("/");
      })
      .catch((error) => {
        // Handle login error silently or show user-friendly message
      });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={handleCloseModal}
      isOpen={isOpen}
      formValid={true}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__button-container">
        <button className="modal__to-register" type="button" onClick={onSignUp}>
          <span className="modal__register-button-text">or Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
