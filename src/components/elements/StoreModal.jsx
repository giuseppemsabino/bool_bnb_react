import { useNavigate } from "react-router-dom";

export default function StoreModal({ id, body, path }) {
  const navigate = useNavigate();
  return (
    <div className="modal" tabIndex="-1" id={id}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={() => navigate(path)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
