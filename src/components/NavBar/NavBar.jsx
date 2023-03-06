// import React from "react";
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
      <div class="logo">
        <h1>Manga-City</h1>
      </div>
      <ul class="nav-links">
        <li>
          <Link to="/orders">Order History</Link>
        </li>
        <li>
          <Link to="/collections">Manga Collections</Link>
        </li>
        <li>
          <Link to="/orders/new">New Order</Link>
        </li>
        <li>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </li>
      </ul>
      <div class="welcome">
        <span>Welcome, {user.name}</span>
      </div>
    </nav>
  );
}

export default NavBar;
