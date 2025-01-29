import Stars from "./Stars";

export default function ReviewCard({ review }) {
  return (
    <div className="d-flex flex-column border-top p-2">
      <div className="d-flex">
        <div className="review-top-side m-2">
          <img className="" src={review.user_img} alt="" />
        </div>

        <div className="">
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
            
            <div className="d-flex align-items-center px-1"><i className="fa-solid fa-circle"></i> Soggiorno di: {review.stay_days} giorni</div>
          </div>
        </div>
      </div>
      <div className="">{review.content}</div>
    </div>
  );
}
