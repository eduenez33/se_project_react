import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, handleModalClose, activeModal, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar: avatarUrl, email, password });
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatarUrl("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      formName="sign-up"
      isOpen={isOpen}
      activeModal={activeModal}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="signUpEmail" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="signUpEmail"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="signUpPassword" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="signUpPassword"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>
      <label htmlFor="signUpUserName" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="signUpUserName"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="signUpAvatarURL" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="signUpAvatarURL"
          placeholder="Avatar URL"
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
