function OfferCard({ offre }) {
    return (
        <div className="card offer-card">
            <div className="card-body">
                <h3 className="card-title">{offre.titre}</h3>
                <p className="card-text fst-italic">
                    {offre.entreprise} — {offre.contrat}
                </p>
                <p className="card-text fw-bold text-danger">
                    {offre.salaireAnnuelMin.toLocaleString('fr-FR')} 
                    – {offre.salaireAnnuelMax.toLocaleString('fr-FR')} €
                </p>
                <button className="btn btn-danger">Postuler &gt;&gt;</button>
            </div>
        </div>
    );
}

export default OfferCard;