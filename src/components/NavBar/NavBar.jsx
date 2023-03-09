import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    // <nav>
    //   <Link to="/orders">Order History</Link>
    //   &nbsp; | &nbsp;
    //   <Link to="/collections">Manga Collections</Link>
    //   &nbsp; | &nbsp;
    //   <Link to="/orders/new">New Order</Link>
    //   &nbsp; | &nbsp;<span>Welcome, {user.name}</span>
    //   &nbsp; | &nbsp;
    //   <Link to="" onClick={handleLogOut}>
    //     Log Out
    //   </Link>
    // </nav>
    <nav>
      <div className="logo">
        <h1>MANGA-GATE</h1>
      </div>
      <ul class="nav-links">
        <div className="nav-link">
          <li>
            <Link to="/fav">Favourite Manga's</Link>
          </li>
        </div>
        <div className="nav-link">
          <li>
            <Link to="/collections">Manga Collections</Link>
          </li>
        </div>

        <div className="nav-link">
          <li>
            <Link to="" onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
        </div>
      </ul>
      <div className="welcome">
        <span>Welcome, {user.name}</span>
      </div>
    </nav>
  );
}

export default NavBar;
