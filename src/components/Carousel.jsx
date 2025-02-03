export default function Carousel({ imagesList, page }) {
  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {imagesList.map((image, index) => {
            return (
              <div
                key={index}
                className={`carousel-item ${!index ? "active" : ""}`}
              >
                {page === "home" ? (
                  <img src={`/img/carousel/${image}`} className="d-block" />
                ) : (
                  <img src={`${image}`} className="d-block w-100" />
                )}
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>

          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
