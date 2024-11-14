import React, { useState } from "react";
import "./Profile.css";
import { FaPencilAlt } from "react-icons/fa";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const currentUserData = userData[currentUser] || {};

  const userProfileObj = {
    firstName: currentUserData.name || "John",
    lastName: currentUserData.lastName || "Doe",
    email: currentUserData.email || currentUser || "user@example.com",
    password: currentUserData.password || "********",
    gender: currentUserData.gender || "Prefer not to say",
    country: currentUserData.country || "Country",
    birthdate: currentUserData.birthdate || "1990-01-01",
  };
  const [userDetails, setUserDetails] = useState(userProfileObj);
  const [isEditing, setIsEditing] = useState(false);
  const handleSavePassword = (newPassword) => {
    const updatedUserData = {
      ...userData,
      [currentUser]: { ...userData[currentUser], password: newPassword },
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setIsPasswordModalOpen(false);
    alert("Password changed successfully!");
  };

  const saveChanges = () => {
    const updatedUserData = {
      ...userData,
      [currentUser]: { ...userData[currentUser], ...userDetails },
    };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info-section">
        <div className="profile-field">
          <label>First Name</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userDetails.firstName}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userDetails.lastName}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>

          <span>{userDetails.email}</span>
        </div>

        <div className="profile-field">
          <label>Password</label>
          {isEditing ? (
            <button
              className="change-password-button"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </button>
          ) : (
            <span>{"********"}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Gender</label>
          {isEditing ? (
            <select
              name="gender"
              value={userDetails.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <p>{userDetails.gender}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Country</label>
          {isEditing ? (
            <input
              type="text"
              name="country"
              value={userDetails.country}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userDetails.country}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Birthdate</label>
          {isEditing ? (
            <input
              type="date"
              name="birthdate"
              value={userDetails.birthdate}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userDetails.birthdate}</span>
          )}
        </div>

        <div className="profile-buttons">
          {isEditing ? (
            <button onClick={saveChanges}>Save Changes</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <FaPencilAlt /> Edit Profile
            </button>
          )}
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default Profile;