export default function InputSearchBar(
  handleInputSearchBarValue,
  handleChangeInput
) {
  return (
    <>
      <div className="row g-1">
        <div className="col-10">
          <input
            className="form-control form-control-lg"
            id="exampleDataList"
            placeholder="Cerca un nome o città..."
            name="text"
            value={handleInputSearchBarValue}
            onChange={handleChangeInput}
          />
        </div>

        <div
          className="col-2 btn btn-outline-dark d-flex align-items-center justify-content-center"
          type="button flex-grow-1"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <h5 className="my-0">
            <i className="fa-solid fa-sliders me-1"></i>
            <span className="d-none d-md-inline">Filtri</span>
          </h5>
        </div>
      </div>
    </>
  );
}
