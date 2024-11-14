import React, { useState } from "react";
import "./ChangePasswordModal.css";

const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!newPassword || !confirmPassword) {
      alert("Password fields cannot be empty. Please enter a password.");
      return;
    }

    if (newPassword === confirmPassword) {
      onSave(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Password</h2>
        <input
          className="modal-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="modal-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
