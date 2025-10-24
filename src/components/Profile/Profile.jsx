import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  cards,
  onCardClick,
  handleAddClick,
  onEditProfile,
  handleLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} handleLogout={handleLogout} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={onCardClick}
          clothingItems={cards}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
