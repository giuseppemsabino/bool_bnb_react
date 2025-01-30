import { Link, NavLink } from "react-router-dom";
import Button from "../elements/Button";
import { useState } from "react";
export default function Navbar() {
  const [homeNavItem, setHomeNavItem] = useState("");
  const [listingsNavItem, setListingsNavItem] = useState("");

  function handleSelectedNavItem(selectedNavItem) {
    if (selectedNavItem === "home") {
      setHomeNavItem("selected");
      setListingsNavItem("");
    } else if (selectedNavItem === "listings") {
      setHomeNavItem("");
      setListingsNavItem("selected");
    }
  }

  // TODO: sistemare setHomeNavItem, selezionamento elementi navbar

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand fs-5"
          to="/"
          onClick={() => handleSelectedNavItem("listings")}
        >
          BoolB&B
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex justify-content-between w-100">
            <ul className="navbar-nav g-5">
              <li
                className={`nav-item ${listingsNavItem}`}
                onClick={() => handleSelectedNavItem("listings")}
              >
                <NavLink className="nav-link active fs-6" to="/">
                  Home
                </NavLink>
              </li>

              <li
                className={`nav-item ${homeNavItem}`}
                onClick={() => handleSelectedNavItem("home")}
              >
                <NavLink className="nav-link active fs-6" to="/properties">
                  Ricerca avanzata
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <div className="me-4">
                <Link
                  className="text-decoration-none text-dark"
                  to="/properties/insert"
                >
                  Inserisci immobili
                </Link>
              </div>
              <Button className="btn login-text" onClick={() => alert("test")}>
                <i className="fa-solid fa-circle-user"></i>
                <span className="fw-semibold "> Login </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
