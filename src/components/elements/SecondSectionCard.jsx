export default function SecondSectionCard({ card }) {
  return (
    <>
      <div className="col-12 col-lg-4">
        <div className="card card-second-section mb-3">
          <div className="row g-0">
            <div className="col-md-3 d-flex align-items-center justify-content-center py-5 p-sm-0">
              <img
                src={`/img/secondSection/${card.img_url}`}
                className="img-second-section-card img-fluid rounded-start w-md-100"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title fw-semibold fs-2">{card.title}</h5>
                <p className="card-text">{card.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
