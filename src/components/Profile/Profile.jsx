import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./Profile.css";

function Profile({ onAddItem, onEditProfile, onLogout }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection onAddItem={onAddItem} />
      </section>
    </div>
  );
}

export default Profile;
