import { Link } from "react-router-dom";    

export default function OffreCarte({ offre }) {
    return (
        <div className="w-100 h-100">                          {/* ← h-100 ajouté */}
            <div className="border rounded p-4 offer-card h-100 d-flex flex-column">
                                                      {/* ← h-100 + flex-column ajoutés */}
                <div className="d-flex gap-3 flex-grow-1">     {/* ← flex-grow-1 ajouté */}
                    <img
                        src="https://placehold.co/400x250"
                        alt="image offre"
                        className="rounded w-100"
                    />
                    <div className="d-flex flex-column container-fluid">
                        <div>
                            <p className="fs-4 mb-0">{offre.titre}</p>
                            <p className="fs-6 mb-2">{offre.entreprise}</p>
                        </div>
                        <div className="d-flex flex-row gap-2 align-items-center">
                            <p><span className="badge bg-primary">{offre.domaine}</span></p>
                            <p><span className="badge bg-primary">{offre.contrat}</span></p>
                            <p><span className="badge bg-primary">{offre.lieu}</span></p>
                        </div>
                        <div className="d-flex flex-row gap-2">
                            <p>
                                <span className="badge bg-primary">
                                    {offre.salaireAnnuelMin} - {offre.salaireAnnuelMax} € / an
                                </span>
                            </p>
                            <p>
                                <span className="badge bg-primary">Exp : {offre.expAnneeMini} année(s)</span>
                            </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-content-center mt-auto">
                            {/* ↑ mt-auto ajouté : pousse cette rangée vers le bas */}
                            <p className="d-flex fst-italic" style={{ height: 100 + "%", alignItems: "center" }}>
                                <span>Publiée le : {offre.datePublication}</span>
                            </p>
                            <Link to={`/offres/${offre.id}`} className="d-block btn btn-primary rounded-pill">
                                Voir l'offre
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-row gap-2 align-items-center'>
              <p>
                <span className='badge bg-primary'>{offre.domaine}</span>
              </p>
              <p>
                <span className='badge bg-primary'>{offre.contrat}</span>
              </p>
              <p>
                <span className='badge bg-primary'>{offre.lieu}</span>
              </p>
            </div>
            <div className='d-flex flex-row gap-2'>
              <p>
                <span className='badge bg-primary'>
                  {offre.salaireAnnuelMin} - {offre.salaireAnnuelMax} € / an
                </span>
              </p>
              <p>
                <span className='badge bg-primary'>
                  Exp : {offre.expAnneeMini} année(s)
                </span>
              </p>
            </div>
            <div className='d-flex flex-row justify-content-between align-content-center'>
              <p
                className='d-flex fst-italic'
                style={{ height: 100 + "%", alignItems: "center" }}
              >
                <span>Publiée le : {offre.datePublication}</span>
              </p>
              <Link
                to={`offres/${offre.id}`}
                className='d-block btn btn-primary rounded-pill'
              >
                Voir l'offre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
