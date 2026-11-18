import { Link } from "react-router-dom";

/**
 * La carte d'offre, briquette de la grille d'accueil.
 * Deux colonnes : image à gauche (photo, état, date),
 * texte à droite (titre, entreprise, badges, action).
 *
 * @param offre   l'offre à afficher
 * @param applied true si l'utilisateur a déjà postulé
 */
export default function OffreCarte({ offre, applied }) {
  return (
    <div className="offer-card h-100 d-flex flex-row gap-3 p-3">

      {/* Colonne image : photo, état de postulation, date en bas */}
      <div className="d-flex flex-column flex-shrink-0 carte-img-colonne">
        <img
          src="https://placehold.co/400x250"
          alt="image offre"
          className="carte-img"
        />

        {/* L'état "déjà postulé" : sous la photo, au-dessus de la date */}
        {applied && (
          <span className="badge badge-deja-postule mx-auto mt-2">
            ✓ Déjà postulé
          </span>
        )}

        {/* La date : plaquée en bas de colonne par mt-auto */}
        <p className="carte-date text-center text-secondary mt-auto mb-0 pt-2">
          Publiée le : {offre.datePublication}
        </p>
      </div>

      {/* Colonne texte : titre, entreprise, badges, action en bas à gauche */}
      <div className="d-flex flex-column flex-grow-1">
        <p className="carte-titre mb-1">{offre.titre}</p>
        <p className="fst-italic mb-2">{offre.entreprise}</p>

        {/* Les badges d'information, alignés sur le texte au-dessus */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge badge-info">{offre.domaine}</span>
          <span className="badge badge-info">{offre.contrat}</span>
          <span className="badge badge-info">{offre.lieu}</span>
          <span className="badge badge-info">
            {offre.salaireAnnuelMin} - {offre.salaireAnnuelMax} € / an
          </span>
          <span className="badge badge-info">
            Exp : {offre.expAnneeMini} an(s)
          </span>
        </div>

        {/* L'action : poussée en bas par mt-auto, alignée à gauche */}
        <div className="mt-auto d-flex justify-content-start flex-wrap">
          <Link to={`/offres/${offre.id}`} className="btn-carte-voir">
            Voir l'offre
          </Link>
        </div>
      </div>
    </div>
  );
}