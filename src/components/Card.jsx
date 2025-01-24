

export default function Card({property}) {
  
    return (
    <div className="card h-100">
      <img src={property.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="row ">
          <div className="col-8">
            <h5 className="card-title">
              {property.title}-<span>No.{property.id}</span>
            </h5>
            <div>
              <p className="card-text tag-card-font mb-1 mt-3">Type</p>
              <p className="tag-card-font text-dark fw-semibold ">
                {property.type}
              </p>
            </div>
            <div>
              <span className="badge text-bg-success mx-1">
                <i className="fa-solid fa-bed"></i> {property.n_beds}
              </span>
              <span className="badge text-bg-success mx-1">
                <i className="fa-solid fa-sink"></i>
                {property.n_bathrooms}
              </span>
              <span className="badge text-bg-success mx-1">
                <i className="fa-solid fa-house"></i>
                {property.n_rooms}
              </span>
            </div>
          </div>
          <div className="col-4 text-end">
            <p className="card-title tag-card-font">
              <i className="fa-solid fa-ruler-combined"></i>
              {property.square_meters}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}