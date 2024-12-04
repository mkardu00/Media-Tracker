import React, { useState } from "react";
import "./Profile.css";
import { FaPencilAlt, FaCamera, FaKey } from "react-icons/fa";
import ChangePasswordModal from "./ChangePasswordModal";
import Favorite from "./Favorite";
import profileImg from "./assets/profile.png";

const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const currentUserData = userData[currentUser] || {};

  const defaultUserProfile = {
    firstName: currentUserData.name || "John",
    lastName: currentUserData.lastName || "Doe",
    email: currentUserData.email || currentUser || "user@example.com",
    gender: currentUserData.gender || "Prefer not to say",
    country: currentUserData.country || "Country",
    birthdate: currentUserData.birthdate || "1990-01-01",
    profileImage: currentUserData.profileImage || "",
  };

  const [userDetails, setUserDetails] = useState(defaultUserProfile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSaveChanges = () => {
    const updatedUserData = {
      ...userData,
      [currentUser]: { ...userData[currentUser], ...userDetails },
    };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails({ ...userDetails, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <h2>MY PROFILE</h2>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <img src={userDetails.profileImage || profileImg} alt="Profile" />
            {isEditing && (
              <div className="upload-overlay">
                <label htmlFor="imageUpload">
                  <FaCamera /> Upload
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>
          <h2>
            {userDetails.firstName.toUpperCase()}{" "}
            {userDetails.lastName.toUpperCase()}
          </h2>
          <p>{userDetails.email}</p>
        </div>

        {isEditing && (
          <div className="profile-details">
            <div className="profile-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Gender</label>
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
            </div>
            <div className="profile-field">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={userDetails.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={userDetails.birthdate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                <FaPencilAlt /> Edit Profile
              </button>
              <button
                className="change-password-button"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                <FaKey /> Change Password
              </button>
            </>
          )}
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={(newPassword) => {
          const updatedUserData = {
            ...userData,
            [currentUser]: {
              ...userData[currentUser],
              password: newPassword,
            },
          };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          setIsPasswordModalOpen(false);
          alert("Password changed successfully!");
        }}
      />
      <Favorite />
    </div>
  );
};

export default Profile;
