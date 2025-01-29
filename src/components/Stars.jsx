export default function Stars({ rating }) {
    const maxStars = 5;
    const starsArray = Array.from({ length: maxStars });
  
    return (
      <div>
        {starsArray.map((star,index) => (
          <i
            key={index}
            className={index < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
        ))}
      </div>
    );
  }
  