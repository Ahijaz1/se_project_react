import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartIcon from "../../images/heart.svg";
import heartActiveIcon from "../../images/heart-active.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h3 className="card__name">{item.name}</h3>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        />
      )}
    </li>
  );
}

export default ItemCard;
