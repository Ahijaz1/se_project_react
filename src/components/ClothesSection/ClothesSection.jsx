import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter clothing items to show only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner?._id === currentUser?._id
  );

  // Debug logging
  console.log("ClothesSection Debug:");
  console.log("clothingItems:", clothingItems?.length, "items");
  console.log("currentUser:", currentUser);
  console.log("currentUser._id:", currentUser?._id);
  console.log("userItems after filter:", userItems?.length, "items");

  // Show a few examples of item owners
  if (clothingItems?.length > 0) {
    console.log(
      "Sample item owners:",
      clothingItems.slice(0, 3).map((item) => ({
        name: item.name,
        ownerId: item.owner?._id,
        hasOwner: !!item.owner,
      }))
    );
  }

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
