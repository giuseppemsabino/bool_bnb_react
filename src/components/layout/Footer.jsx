import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <div className="container">
        <div className="row ">
          <div className="col-md-3 footer-section">
            <strong>
              <p>About Us</p>
            </strong>
            <Link to={"/about"}>Chi siamo?</Link>
          </div>
          <div className="col-md-3 footer-section">
            <strong>
              <p>Contatti</p>
            </strong>
            <p>
              Email: <br />
              info@azienda.com
            </p>
            <p>
              Telefono: <br />
              +39 123 456 789
            </p>
          </div>
          <div className="col-md-3 footer-section">
            <strong>
              <p>Privacy, Termini e Condizioni</p>
            </strong>
            <p>Informazione sulla privacy e coockies</p>
            <p>Qua trovi i termini e condizioni</p>
          </div>
          <div className="col-md-3 footer-section">
            <strong>
              <p>Dati della Azienda</p>
            </strong>
            <p>BoolB&B S.p.A.</p>
            <p>Sede: Via Roma 1, 00100 Roma</p>
            <p>
              P.IVA: <br /> 12345678901
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>
            &copy; {new Date().getFullYear()} BoolB&B S.p.A. Tutti i diritti
            riservati.
          </p>
          <p>
            Bool BnB è parte di Bool Holdings Inc., leader mondiale nel settore
            dei viaggi online e relativi servizi.
          </p>
        </div>
      </div>
    </footer>
  );
}
