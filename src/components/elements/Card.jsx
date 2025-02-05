import { Link } from "react-router-dom";
import { useState } from "react";

export default function Card({ property }) {
  const [count, setCount] = useState(0);

  return (
    <div className="col-md-6 col-lg-4 position-relative">
      <div id="heart" onClick={() => setCount(count + 1)}>
        <i className="fa-solid fa-heart fs-4 text-danger"></i>
        <span className="text-light fw-semibold">{count}</span>
      </div>
      <Link className="text-decoration-none" to={`/properties/${property.id}`}>
        <div className="card h-100">
          <div className="image-container">
            <img
              src={
                property.images[0]
                  ? property.images[0].img_url
                  : "/img/placeholder.png"
              }
              className="img-fluid"
            />
          </div>

          <div className="card-body">
            <div className="row h-100">
              <div className="col-8 h-100 d-flex flex-column justify-content-between">
                <h5 className="card-title">{property.title}</h5>
                <h6>No. {property.id}</h6>

                <div>
                  <p className="card-text tag-card-font">Tipologia</p>
                  <p className="tag-card-font text-dark fw-semibold">
                    <i className={`fa-solid ${property.type_icon} mx-1`}></i>
                    {property.type_name}
                  </p>
                </div>

                <div>
                  <span className="badge text-bg-success mx-1">
                    <i className="fa-solid fa-bed mx-1"></i> {property.n_beds}
                  </span>
                  <span className="badge text-bg-success mx-1">
                    <i className="fa-solid fa-toilet mx-1"></i>
                    {property.n_bathrooms}
                  </span>
                  <span className="badge text-bg-success mx-1">
                    <i className="fa-solid fa-door-closed mx-1"></i>
                    {property.n_rooms}
                  </span>
                </div>
              </div>
              <div className="col-4 h-100 text-end">
                <span className="card-title tag-card-font">
                  <i className="fa-solid fa-ruler-combined mx-1"></i>
                  {property.square_meters}
                </span>
                <p className="address-span">{property.address}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
