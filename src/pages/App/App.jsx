import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import Collections from "../Collections/Collections";
import { getUser } from "../../utilities/users-service";
import DetailPage from "../DetailPage/DetailPage";

function App() {
  const [user, setUser] = useState(getUser);

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
            <Route path="/collections/:endpoint" element={<DetailPage />} />
            <Route path="/favs" element={<Fav />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
