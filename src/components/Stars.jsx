export default function Stars({ rating }) {
    const starsArray = ["","","","",""];
  
    return (
      <>
        {starsArray.map((star,index) => (
          <i
            key={index}
            className={index < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
        ))}
      </>
    );
  }
  