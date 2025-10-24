import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter clothing items to show only those owned by the current user
  // Handle both object owner (item.owner._id) and string owner (item.owner) formats
  const userItems = clothingItems.filter(
    (item) => (item.owner?._id || item.owner) === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header ">
        <p className="clothes-section__header-text">Your Items</p>
        <button
          className="clothes-section__header-btn"
          onClick={handleAddClick}
          type="button"
        >
          {" "}
          + Add New
        </button>
      </div>
      {userItems.length === 0 ? (
        <div className="clothes-section__empty">
          <p className="clothes-section__empty-text">
            You haven't added any clothing items yet.
          </p>
          <button
            className="clothes-section__empty-btn"
            onClick={handleAddClick}
            type="button"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <ul className="clothes-section__cards-list">
          {userItems.map((item) => (
            <ItemCard
              item={item}
              key={item._id}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
