export default function Counter({
  counterName,
  setFormData,
  formDataCounter,
  formData,
  counter,
}) {
  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <span>{counterName}</span>
        <div>
          {!formDataCounter ? (
            <button type="button" className="btn-counter" disabled>
              <i className="fa-solid fa-minus"></i>
            </button>
          ) : (
            <button
              type="button"
              className="btn-counter"
              onClick={() =>
                setFormData({
                  ...formData,
                  [counter]: formDataCounter - 1,
                })
              }
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          )}

          <span className="mx-2">{formDataCounter}</span>
          <button
            type="button"
            className="btn-counter"
            onClick={() =>
              setFormData({
                ...formData,
                [counter]: formDataCounter + 1,
              })
            }
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
}
