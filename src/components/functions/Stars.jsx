export default function Stars({ rating }) {
  const starsArray = ["", "", "", "", ""];

  return (
    <>
      {starsArray.map((star, index) => (
        <span key={index} className="h5">
          <i
            className={
              index < rating ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </span>
      ))}
    </>
  );
}
