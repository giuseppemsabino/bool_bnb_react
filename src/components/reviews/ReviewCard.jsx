import Stars from "../functions/Stars";

export default function ReviewCard({ review }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
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
              <i className="fa-solid fa-circle"></i> Soggiorno di:{" "}
              {review.stay_days} giorni
            </div>
          </div>
        </div>
        <div className="ms-auto">
          <button
            className="btn"
            data-bs-target="#deleteReview"
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
  );
}
