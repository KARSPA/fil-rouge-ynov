import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOfferById } from "../services/offresService";
import useAuth from "../hooks/useAuth";

export default function DetailOffrePage() {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);

    // Le rôle vient du contexte partagé maintenant
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    useEffect(() => {
        getOfferById(id)
            .then(data => setOffer(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!offer) {
        return <p className="container mt-5">Chargement...</p>;
    }

    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    {/* ===== La fiche : même DA que les cartes de l'accueil ===== */}
                    <div className="fiche-offre p-4">
                        <div className="d-flex gap-3 align-items-start">
                            <img
                                src="https://placehold.co/400x250"
                                alt="image offre"
                                className="rounded fiche-offre-img flex-shrink-0"
                            />
                            <div>
                                <h1 className="fs-3 mb-1">{offer.titre}</h1>
                                <p className="mb-2 fst-italic">{offer.entreprise} - {offer.lieu}</p>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge bg-primary">{offer.domaine}</span>
                                    <span className="badge bg-primary">{offer.contrat}</span>
                                    <span className="badge bg-primary-subtle text-primary">
                                        {offer.salaireAnnuelMin} - {offer.salaireAnnuelMax} € / an
                                    </span>
                                    <span className="badge bg-primary-subtle text-primary">
                                        Exp : {offer.expAnneeMini} an(s)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-3 mb-1">{offer.description}</p>
                        <p className="fst-italic text-secondary mb-0">
                            Publiée le : {offer.datePublication}
                        </p>
                    </div>

                    {/* ===== Le bandeau d'actions selon le rôle (réel, enfin) ===== */}
                    <div className="bandeau-actions d-flex justify-content-center gap-3 py-3">
                        {/* Visiteur : pas connecté → on le pousse vers la connexion */}
                        {!user && (
                            <Link to="/connexion" className="btn-actions-bandeau">
                                Connecte-toi et rejoins les rangs !
                            </Link>
                        )}

                        {/* User connecté : candidature (fictive pour l'instant) */}
                        {user && !isAdmin && (
                            <button className="btn-actions-bandeau">
                                Au charbon !
                            </button>
                        )}

                        {/* Admin connecté : modifier + supprimer */}
                        {isAdmin && (
                            <>
                                <button className="btn-actions-bandeau btn-actions-modif">
                                    Modifier l'offre
                                </button>
                                <button className="btn-actions-bandeau btn-actions-suppr">
                                    Supprimer l'offre
                                </button>
                            </>
                        )}
                    </div>

                    <div className="text-center mt-3">
                        <Link to="/" className="btn btn-outline-dark">← Retour aux offres</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}