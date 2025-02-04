export default function AboutUsPage() {
  return (
    <div className="container">
      <div className="text-center p-5 m-2">
        <h1>Developers</h1>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="team-card col-9 col-md-3">
          <img
            src="src/assets/img/angelo.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title mt-5">
              <strong> Angelo Gemelli </strong>
            </h5>
          </div>
        </div>
        <div className=" team-card col-9 col-md-3">
          <img
            src="src/assets/img/dario.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title mt-5">
              <strong> Dario Miceli </strong>
            </h5>
          </div>
        </div>
        <div className=" team-card col-9 col-md-3">
          <img
            src="src/assets/img/ema.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title mt-5">
              <strong> Emanuele Zuppardo </strong>
            </h5>
          </div>
        </div>
        <div className=" team-card col-9 col-md-3">
          <img
            src="src/assets/img/giuseppe.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title mt-5">
              <strong> Giuseppe A. Mendoza S. </strong>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
