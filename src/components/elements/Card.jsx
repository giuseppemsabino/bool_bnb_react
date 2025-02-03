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
            <img src={property.images[0].img_url} className="img-fluid" />
          </div>
          <div className="card-body">
            <div className="row ">
              <div className="col-8">
                <h5 className="card-title">
                  {property.title}-<span>No.{property.id}</span>
                </h5>
                <div>
                  <p className="card-text tag-card-font mb-1 mt-3">Type</p>
                  <p className="tag-card-font text-dark fw-semibold ">
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
                    <i className="fa-solid fa-house mx-1"></i>
                    {property.n_rooms}
                  </span>
                </div>
              </div>
              <div className="col-4 text-end">
                <span className="card-title tag-card-font">
                  <i className="fa-solid fa-ruler-combined mx-1"></i>
                  {property.square_meters}
                </span>
                <p>{property.address}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
