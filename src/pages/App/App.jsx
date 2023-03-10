import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import Collections from "../Collections/Collections";
import { getUser } from "../../utilities/users-service";
import DetailPage from "../DetailPage/DetailPage";
import Fav from "../Fav/Fav";

function App() {
  const [user, setUser] = useState(getUser);
  const [favManga, setFavManga] = useState([]);

  const addToFav = (manga) => {
    const isMangaInFav = favManga.some((m) => m.title === manga.title);

    if (!isMangaInFav) {
      setFavManga((prevFavManga) => [...prevFavManga, manga]);
    }
  };
  useEffect(() => {
    setFavManga([]);
  }, [user]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/"
              element=<div className="white">
                <h1>WELCOME TO MANGA-GATE</h1>
                <div className="vertical-text-container">
                  <img src="/images/manga.png" alt="Manga" />
                  <h3>
                    At Manga-Gate, we're more than just a digital manga
                    platform. We're a community of manga lovers and advocates
                    who are dedicated to bringing you the highest quality
                    localized manga available. We believe that everyone deserves
                    access to the rich and exciting world of Japanese manga, and
                    we're committed to making that world more accessible than
                    ever before. Whether you're a long-time fan of the medium or
                    just discovering it for the first time, we have something
                    for everyone. From action-adventure epics to heart-pounding
                    romances, from blockbuster titles to hidden gems waiting to
                    be discovered, we know we have just the right manga for you.
                    And with our easy-to-use platform, you'll have access to it
                    all at your fingertips!
                  </h3>
                </div>
              </div>
            />
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/collections" element={<Collections />} />
            <Route
              path="/collections/:endpoint"
              element={<DetailPage addToFav={addToFav} />}
            />
            <Route path="/favs" element={<Fav favManga={favManga} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
