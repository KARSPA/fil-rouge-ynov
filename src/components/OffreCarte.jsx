import { Link } from "react-router-dom";

export default function OffreCarte({ offre }) {
  return (
    <div className='w-100 h-100'>
      <div className='border rounded p-4 offer-card h-100 d-flex flex-column'>
        <div className='d-flex gap-3 flex-grow-1'>
          <img
            src='https://placehold.co/400x250'
            alt='image offre'
            className='rounded w-100'
          />
          <div className='d-flex flex-column container-fluid'>
            <div>
              <p className='fs-4 mb-0'>{offre.titre}</p>
              <p className='fs-6 mb-2'>{offre.entreprise}</p>
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
            <div className='d-flex flex-row justify-content-between align-content-center mt-auto'>
              {/* mt-auto : pousse cette rangée vers le bas de la carte */}
              <p className='d-flex fst-italic align-items-center mb-0'>
                <span>Publiée le : {offre.datePublication}</span>
              </p>
              <Link
                to={`/offres/${offre.id}`}
                className='d-block btn btn-primary'
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
