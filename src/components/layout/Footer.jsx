import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-bg-dark py-3 mt-5">
      <div className="row row-cols-sm-2 row-cols-md-4 text-center">
        <div className="footer-section">
          <strong>About Us</strong>
          <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
            <li>
              <Link className="text-decoration-none text-white" to={"/about"}>
                Chi siamo?
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <strong>Contatti</strong>
          <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
            <li>Email: info@azienda.com</li>
            <li>Telefono: +39 0123456789</li>
          </ul>
        </div>
        <div className="footer-section">
          <strong>Privacy</strong>
          <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
            <li>Informazione sulla privacy</li>
            <li>Cookies</li>
            <li>Termini e condizioni</li>
          </ul>
        </div>
        <div className="footer-section">
          <strong>Dati Azienda</strong>
          <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
            <li>BoolB&B S.p.A.</li>
            <li>Via Roma 1, 00100 Roma</li>
            <li>P.IVA: 12345678901</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span>
          &copy; {new Date().getFullYear()} BoolB&B S.p.A. Tutti i diritti
          riservati.
        </span>
        <p>
          Bool BnB è parte di Bool Holdings Inc., leader mondiale nel settore
          dei viaggi online e relativi servizi.
        </p>
      </div>
    </footer>
  );
}
