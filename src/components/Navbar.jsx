
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bool B&B
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex justify-content-between w-100">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/properties"
                >
                  Lista dei Immobili
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/properties"
                >
                  Lista dei Immobili
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <Button className="btn btn-purple" onClick={() => alert("test")}><i className="fa-solid fa-circle-user"></i> <span className="fw-semibold"> Login </span></Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
