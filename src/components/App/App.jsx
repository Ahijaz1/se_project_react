import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Component imports
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Footer from "../Footer/Footer";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Utility imports
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItemOld as deleteItem,
  like,
  unlike,
  likeItem,
  unlikeItem,
  updateProfile,
} from "../../utils/api.js";
import { checkAuth, signup, signin } from "../../utils/auth.js";

function App() {
  const navigate = useNavigate();

  // User state
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Weather and UI state
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const onSignUp = () => {
    setActiveModal("sign-up");
  };

  const onLogIn = () => {
    setActiveModal("log-in");
  };

  const handleSignUp = () => {
    setActiveModal("sign-up");
  };

  const handleLogIn = () => {
    setActiveModal("log-in");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    console.log("Adding item:", { name, imageUrl, weather });

    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        console.log("Item added successfully:", newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
        alert("Failed to add item: " + err.message);
      });
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("delete");
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    console.log("Deleting item:", itemToDelete);

    const key = itemToDelete._id || itemToDelete.id;

    deleteItem(key)
      .then(() => {
        setClothingItems((prev) => {
          const updated = prev.filter((i) => (i._id || i.id) !== key);
          console.log("Updated list:", updated);
          return updated;
        });
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // Authentication handlers
  const handleRegisterSubmit = (userData) => {
    setIsLoading(true);

    return signup(userData)
      .then(() => {
        return signin({
          email: userData.email,
          password: userData.password,
        });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkAuth(data.token);
      })
      .then((currentUser) => {
        setCurrentUser(currentUser);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Registration or login failed:", error);
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginSubmit = (userData) => {
    setIsLoading(true);
    return signin(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkAuth(res.token);
        } else {
          throw new Error("Login failed: No token received");
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login Error:", err);
        return Promise.reject(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        likeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        unlikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);

    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser({
          ...currentUser,
          ...updatedUser,
        });
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Profile update error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // ESC key handler
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // Authentication check on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkAuth(token)
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              onAddGarment={handleAddClick}
              weatherData={weatherData}
              onSignUp={onSignUp}
              onLogIn={onLogIn}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogout}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      cards={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfile}
                      onCardLike={handleCardLike}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
          )}

          {activeModal === "sign-up" && (
            <RegisterModal
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "sign-up"}
              onSubmit={handleRegisterSubmit}
              onLogin={handleLogIn}
              isLoading={isLoading}
            />
          )}

          {activeModal === "log-in" && (
            <LoginModal
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "log-in"}
              onSubmit={handleLoginSubmit}
              onSignUp={handleSignUp}
              isLoading={isLoading}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              onClose={closeActiveModal}
              isOpen={activeModal === "edit-profile"}
              onUpdateUser={handleEditProfileSubmit}
              isLoading={isLoading}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              isOpen={activeModal === "preview"}
              handleDeleteItem={handleDeleteClick}
            />
          )}

          <DeleteConfirmationModal
            isOpen={activeModal === "delete"}
            onClose={() => {
              setItemToDelete(null);
              closeActiveModal();
            }}
            onCardDelete={handleConfirmDelete}
            itemName={itemToDelete?.name}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
