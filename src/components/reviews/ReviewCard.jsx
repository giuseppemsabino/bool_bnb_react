import Stars from "../functions/Stars";

export default function ReviewCard({ review, fetchProperty, propertyId }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDeleteReview = (id) => {
    const url = `${apiUrl}/api/properties/reviews/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProperty(propertyId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="col-lg-6 d-flex flex-column">
        <div className="d-flex gap-2 pt-3 mx-2 border-top">
          <div>
            <img id="userImg" src={review.user_img} />
          </div>

          <div>
            <div>
              <p className="p-0 m-0">
                <strong>
                  {review.name} {review.surname}
                </strong>
              </p>
            </div>
            <div className="d-flex stars-stay ">
              <div>
                <span>
                  <Stars rating={review.rating} />{" "}
                </span>
              </div>

              <div className="d-flex align-items-center px-1">
                <i className="fa-solid fa-circle mx-1"></i>
                <span>{review.stay_days} giorni</span>
              </div>
            </div>
          </div>
          <div className="ms-auto">
            <button
              className="btn"
              data-bs-target={`#deleteReview${review.id}`}
              data-bs-toggle="modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div className="col py-2">
          <p>{review.content}</p>
        </div>
      </div>
      <div
        className="modal fade"
        id={`deleteReview${review.id}`}
        tabIndex="-1"
        aria-labelledby="deleteReviewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteReviewLabel">
                Eliminazione Recensione
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              La procedura è irreversibile, sei sicuro di voler procedere?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annulla
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDeleteReview(review.id)}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
