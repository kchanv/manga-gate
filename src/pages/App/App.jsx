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
            <Route path="/" element={<h1>ROOT</h1>} />
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
