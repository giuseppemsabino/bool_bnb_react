export default function PopularDestinationCard({
  destination,
  col,
  index,
  onClick,
}) {
  return (
    <div className={col} key={index}>
      <div
        className="popular-destination-card card text-bg-dark"
        onClick={() => onClick(destination.name)}
      >
        <img
          src={destination.path}
          className="card-img popular-destination-card-img"
          alt={destination.name}
        />
        <div className="card-img-overlay">
          <h5 className="card-title popular-destination-card-title fs-2 fw-semibold">
            {destination.name}
          </h5>
        </div>
      </div>
    </div>
  );
}
