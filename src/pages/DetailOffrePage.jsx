import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOfferById } from "../services/offresService";

// TEMPORAIRE : simulation du rôle, même principe que la navbar.
// À remplacer par : const { user } = useAuth();  quand l'AuthContext existera.
const fakeAdmin = { nom: "Diane", role: "admin" };
const fakeUser = { nom: "Ivan", role: "user" };

function DetailOffrePage() {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);

    // Simulation de session (à remplacer par le contexte plus tard)
    const [user, setUser] = useState(null);
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
                        <div className="d-flex gap-3">
                            <img
                                src="https://placehold.co/400x250"
                                alt="image offre"
                                className="rounded fiche-offre-img flex-shrink-0"
                            />
                            <div>
                                <h1 className="fs-3 rubrique-detail">{offer.titre}</h1>
                                <p className="mb-2 fst-italic">{offer.entreprise} - {offer.lieu}</p>
                                <div className="d-flex flex-wrap gap-2 mb-3">
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

                        <p className="mt-3">{offer.description}</p>
                        <p className="fst-italic text-secondary mb-0">
                            Publiée le : {offer.datePublication}
                        </p>
                    </div>

                    {/* ===== Le bandeau d'actions selon le rôle ===== */}
                    <div className="bandeau-actions d-flex justify-content-center gap-3 py-3">
                        {/* Visiteur : pas encore connecté → on le pousse vers la connexion */}
                        {!user && (
                            <Link to="/connexion" className="btn btn-actions-bandeau">
                                Connectez-vous pour postuler
                            </Link>
                        )}

                        {/* User connecté : postuler (factice pour l'instant) */}
                        {user && !isAdmin && (
                            <button className="btn btn-actions-bandeau">
                                Postuler
                            </button>
                        )}

                        {/* Admin connecté : modifier + supprimer */}
                        {isAdmin && (
                            <>
                                <button className="btn btn-actions-bandeau">
                                    Modifier l'offre
                                </button>
                                <button className="btn btn-actions-bandeau btn-actions-suppr">
                                    Supprimer l'offre
                                </button>
                            </>
                        )}
                    </div>

                    {/* TEMPORAIRE : boutons de démo pour tester les 3 états, à virer */}
                    <div className="d-flex justify-content-center gap-2 mt-2">
                        <button className="btn btn-sm btn-outline-dark"
                                onClick={() => setUser(null)}>
                            [démo visiteur]
                        </button>
                        <button className="btn btn-sm btn-outline-dark"
                                onClick={() => setUser(fakeUser)}>
                            [démo user]
                        </button>
                        <button className="btn btn-sm btn-outline-dark"
                                onClick={() => setUser(fakeAdmin)}>
                            [démo admin]
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <Link to="/" className="btn btn-outline-dark">← Retour aux offres</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOffrePage;