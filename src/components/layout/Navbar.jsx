import { Link, NavLink } from "react-router-dom";
import Button from "../elements/Button";
import { usePropertiesContext } from "../../contexts/PropertiesContext";

export default function Navbar() {
  const { selectedItem, setSelectedItem } = usePropertiesContext();

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <Link
          className="navbar-brand fs-5"
          to="/"
          onClick={() => setSelectedItem("home")}
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
                className={`nav-item ${selectedItem == "home" && "selected"}`}
                onClick={() => setSelectedItem("home")}
              >
                <NavLink className="nav-link active fs-6" to="/">
                  Home
                </NavLink>
              </li>

              <li
                className={`nav-item ${selectedItem == "search" && "selected"}`}
                onClick={() => setSelectedItem("search")}
              >
                <NavLink className="nav-link active fs-6" to="/properties">
                  Ricerca avanzata
                </NavLink>
              </li>
            </ul>
            <div
              className={`d-flex align-items-center flex-column flex-md-row`}
            >
              <div
                className={`insert-item me-4 insert nav-item ${
                  selectedItem == "insert" && "selected"
                }`}
              >
                <NavLink
                  className={`nav-item-insert text-decoration-none text-dark nav-link active fs-6`}
                  onClick={() => setSelectedItem("insert")}
                  to="/properties/insert"
                >
                  Inserisci immobili
                </NavLink>
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
