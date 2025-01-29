export default function ReviewCard({ review }) {
  return (
    <div className="card">
      <div className="card-body">
        <img src={review.user_img} className="img-fluid" />
        <span className="card-title">{`${review.name} ${review.surname}`}</span>
        <p className="card-text">{review.content}</p>
        <span>{review.stay_days}</span>
        <h5>{review.start_date.slice(0, 10)}</h5>
      </div>
    </div>
  );
}
