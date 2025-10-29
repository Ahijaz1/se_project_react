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
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import Footer from "../Footer/Footer";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Utility imports
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItemOld as deleteItem,
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

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);

  // Universal submit handler for consistent loading states and error handling
  function handleSubmit(request) {
    // start loading
    setIsLoading(true);
    request()
      // we need to close only in `then`
      .then(closeActiveModal)
      // we need to catch possible errors
      // console.error is used to handle errors if you don't have any other ways for that
      .catch(console.error)
      // and in finally we need to stop loading
      .finally(() => setIsLoading(false));
  }

  const closeActiveModal = () => {
    setActiveModal("");
  };

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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    // here we create a function that returns a promise
    const makeRequest = () => {
      return addItem({ name, imageUrl, weather }).then((newItem) => {
        setClothingItems((prevItems) => {
          const updated = [newItem, ...prevItems];
          return updated;
        });
      });
    };
    // here we call handleSubmit passing the request
    return handleSubmit(makeRequest);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("delete");
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    // Check if user is authenticated
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please log in to delete items");
      return;
    }

    // Additional validation for current user
    if (!currentUser || !isLoggedIn) {
      alert("Please log in to delete items");
      handleLogout();
      return;
    }

    const key = itemToDelete._id || itemToDelete.id;

    deleteItem(key)
      .then(() => {
        setClothingItems((prev) => {
          return prev.filter((i) => (i._id || i.id) !== key);
        });
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch((err) => {
        // If token is expired, redirect to login
        if (
          err.message?.includes("token") ||
          err.message?.includes("expired") ||
          err.message?.includes("Invalid")
        ) {
          alert("Your session has expired. Please log in again.");
          handleLogout(); // Log out the user
          return;
        }
        alert("Failed to delete item: " + err.message);
      });
  };

  // Authentication handlers
  const handleRegisterSubmit = (userData) => {
    // here we create a function that returns a promise
    const makeRequest = () => {
      // `return` lets us use a promise chain `then, catch, finally`
      return signup(userData).then((res) => {
        if (res.token && res.user) {
          // New optimized registration - token and user data included
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res.user);
          setIsLoggedIn(true);
        } else {
          // Fallback to old registration flow
          return signin({
            email: userData.email,
            password: userData.password,
          }).then((loginRes) => {
            if (loginRes.token && loginRes.user) {
              localStorage.setItem("jwt", loginRes.token);
              setCurrentUser(loginRes.user);
              setIsLoggedIn(true);
            } else if (loginRes.token) {
              localStorage.setItem("jwt", loginRes.token);
              return checkAuth(loginRes.token).then((currentUser) => {
                setCurrentUser(currentUser);
                setIsLoggedIn(true);
              });
            }
          });
        }
      });
    };
    // here we call handleSubmit passing the request
    return handleSubmit(makeRequest);
  };

  const handleLoginSubmit = (userData) => {
    // here we create a function that returns a promise
    const makeRequest = () => {
      return signin(userData)
        .then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);

            // Try both old and new response formats for compatibility
            if (res.user) {
              // New optimized format with user data included
              setCurrentUser(res.user);
              setIsLoggedIn(true);
            } else {
              // Fallback to old format - make checkAuth call
              return checkAuth(res.token).then((userData) => {
                setCurrentUser(userData);
                setIsLoggedIn(true);
              });
            }
          } else {
            throw new Error("Login failed: No token received");
          }
        })
        .catch((error) => {
          throw error; // Re-throw so handleSubmit can catch it
        });
    };
    // here we call handleSubmit passing the request
    return handleSubmit(makeRequest);
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
          .catch(console.error)
      : // if not, send a request to remove the user's id from the card's likes array
        unlikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    // here we create a function that returns a promise
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      // `return` lets us use a promise chain `then, catch, finally`
      return updateProfile({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser({
          ...currentUser,
          ...updatedUser,
        });
      });
    };
    // here we call handleSubmit passing the request
    return handleSubmit(makeRequest);
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
              isLoading={isLoading}
              weatherData={weatherData}
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
