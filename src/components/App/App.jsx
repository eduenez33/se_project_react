import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi.js";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { signup, signin, getUserInfo, updateUser } from "../../utils/auth.js";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import ClothingItemsContext from "../../contexts/ClothingItemsContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [activeCard, setActiveCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleLogInClick = () => {
    setActiveModal("log-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setActiveCard(card);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather }).then((item) => {
      setClothingItems((prev) => [item, ...prev]);
      handleModalClose();
    });
  };

  const handleItemDelete = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id)
        );

        handleModalClose();
      })
      .catch((error) => {
        console.error("Failed to delete the item", error);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        handleModalClose();
        return signin({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user || { name, avatar, email });
      })
      .catch((error) => {
        console.error("Registration or sign-in failed:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setCurrentUser(res.user || { email });
          handleModalClose();
        } else {
          console.error("No token received from server");
        }
      })
      .catch((error) => {
        console.error("Sign-in failed:", error);
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleModalClose();
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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

  useEffect(() => {
    // Check if user is already logged in on app load
    const token = localStorage.getItem("jwt");
    if (token) {
      // Validate token with server and get user info
      getUserInfo()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error("Invalid token:", error);
          // Remove invalid token from localStorage
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <ClothingItemsContext.Provider
          value={{ clothingItems, handleCardClick, handleCardLike }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
                handleSignUpClick={handleSignUpClick}
                handleLogInClick={handleLogInClick}
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
                    <ProtectedRoute>
                      <Profile
                        onAddItem={handleAddClick}
                        onEditProfile={handleEditProfileClick}
                        onLogout={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
            <RegisterModal
              isOpen={activeModal === "sign-up"}
              handleModalClose={handleModalClose}
              activeModal={activeModal}
              onSubmit={handleRegistration}
            />
            <LoginModal
              isOpen={activeModal === "log-in"}
              handleModalClose={handleModalClose}
              activeModal={activeModal}
              onSubmit={handleLogin}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              handleModalClose={handleModalClose}
              activeModal={activeModal}
              onSubmit={handleUpdateProfile}
            />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              handleModalClose={handleModalClose}
              activeModal={activeModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              activeModal={activeModal}
              card={activeCard}
              handleModalClose={handleModalClose}
              onItemDelete={handleItemDelete}
            />
          </div>
        </ClothingItemsContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
