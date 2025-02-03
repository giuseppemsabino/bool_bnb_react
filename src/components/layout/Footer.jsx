export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 footer-section">
                        <h4>About Us</h4>
                        <p>Informazioni sulla nostra azienda...</p>
                    </div>
                    <div className="col-md-3 footer-section">
                        <h4>Contatti</h4>
                        <p>Email: info@azienda.com</p>
                        <p>Telefono: +39 123 456 789</p>
                    </div>
                    <div className="col-md-3 footer-section">
                        <h4>Privacy, Termini e Condizioni</h4>
                        <p>Informazioni sulla privacy...</p>
                        <p>Informazioni sui termini e condizioni...</p>

                    </div>
                    <div className="col-md-3 footer-section">
                        <h4>Dati della Azienda</h4>
                        <p>Nome Azienda S.p.A.</p>
                        <p>Indirizzo: Via Roma 1, 00100 Roma</p>
                        <p>P.IVA: 12345678901</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
