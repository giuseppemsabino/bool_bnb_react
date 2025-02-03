export default function AboutUsPage() {
  return (
    <div className="container">
        <div className="text-center p-5 m-2"> 
            <h1>Developers</h1>
        </div>
      <div className="d-flex justify-content-around us-section">
        <div className="card team-card col-3">
          <img
            src="src/assets/img/angelo.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title">Angelo Gemelli</h5>
          </div>
        </div>
        <div className="card team-card col-3">
          <img
            src="src/assets/img/dario.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title">Dario Miceli</h5>
          </div>
        </div>
        <div className="card team-card col-3">
          <img
            src="src/assets/img/ema.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title">Emanuele Zuppardo</h5>
          </div>
        </div>
        <div className="card team-card col-3">
          <img
            src="src/assets/img/giuseppe.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title">Giuseppe A. Mendoza S.</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
