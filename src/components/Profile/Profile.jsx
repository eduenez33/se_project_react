import SideBar from "../SideBar/SideBar";

import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <SideBar />
      <div className="profile__content">
        <div className="profile__heading-container">
          <p className="profile__text">Your items</p>
          <button className="profile__add-new-btn">+ Add new</button>
        </div>
        <div className="profile__cards">cards</div>
      </div>
    </section>
  );
}

export default Profile;
