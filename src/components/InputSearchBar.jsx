export default function InputSearchBar({
  searchInput,
  setSearchInput,
  setFilteredProperties,
  properties,
  searchpage,
}) {
  function handleChangeInput(e) {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
  }

  function handleSearchBar(e) {
    e.preventDefault();
    setFilteredProperties(
      properties.filter((property) => {
        return (
          property.title
            .toLowerCase()
            .includes(searchInput.text.toLowerCase()) ||
          property.address
            .toLowerCase()
            .includes(searchInput.text.toLowerCase())
        );
      })
    );
    setSearchInput({ ...searchInput, text: "" });
  }

  return (
    <form onSubmit={handleSearchBar}>
      <h1 className="my-4">Cerca il tuo immobile</h1>
      <div className="row g-1">
        <div className="col-10">
          <input
            className="form-control form-control-lg"
            id="exampleDataList"
            placeholder="Cerca un nome o città..."
            name="text"
            value={searchInput.text}
            onChange={handleChangeInput}
          />
        </div>

        {searchpage ? (
          <button
            className="col-2 btn btn-outline-dark d-flex align-items-center justify-content-center"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <h5 className="my-0">
              <i className="fa-solid fa-sliders me-1"></i>
              <span className="d-none d-md-inline">Filtri</span>
            </h5>
          </button>
        ) : (
          <button
            type="submit"
            className="col-2 btn btn-outline-dark d-flex align-items-center justify-content-center"
          >
            <h5 className="my-0">
              <span className="d-none d-md-inline">Cerca</span>
            </h5>
          </button>
        )}
      </div>
    </form>
  );
}
