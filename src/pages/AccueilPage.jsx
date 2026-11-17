import { useEffect, useState } from "react";
import { getOffres } from "../services/offresService.js";
import BarreRecherche from "../components/BarreRecherche.jsx";
import OffreCarte from "../components/OffreCarte.jsx";

const OFFRES_PAR_PAGE = 6;   // 3 rangées de 2 colonnes

export default function AccueilPage() {
    const [offers, setOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getOffres()
            .then(data => setOffers(data))
            .catch(error => console.error(error));
    }, []);

    // --- Pagination ---
    const totalPages = Math.max(1, Math.ceil(offers.length / OFFRES_PAR_PAGE));

    // Sécurité : si on est sur une page qui n'existe plus, on revient à la 1re
    const safePage = Math.min(currentPage, totalPages);
    const pagedOffers = offers.slice(
        (safePage - 1) * OFFRES_PAR_PAGE,
        safePage * OFFRES_PAR_PAGE
    );

    // --- Message si aucune offre ---
    const aucunResultat = offers.length === 0;

    return (
        <div className="container mt-4">
            <header className="banner text-center text-white py-4">
                <h1 className="text-uppercase fw-bold">Au Boulot !</h1>
                <p className="fst-italic mb-0">
                    La plateforme qui te met un coup de pied aux fesses
                </p>
                <p className="fst-italic mb-0 pt-0">
                    pour faire décoller ta recherche d'emploi !
                </p>
            </header>

            {/* Barre de recherche : ton composant existant,
                le branchement réel sera fait par tes collègues */}
            <BarreRecherche />

            <h2 className="rubrique mt-4">Toutes les offres</h2>

            <div className="cadre-offres mt-3">
                {aucunResultat ? (
                    <p className="text-center fst-italic mb-0">
                        Aucune offre pour le moment... revenez bientôt !
                    </p>
                ) : (
                    <>
                        <div className="grille-offres">
                            {pagedOffers.map(offre => (
                                <OffreCarte key={offre.id} offre={offre} />
                            ))}
                        </div>

                        <div className="d-flex justify-content-center align-items-center gap-3 mt-3 pt-2 border-top">
                            <button
                                className="btn btn-outline-dark"
                                disabled={safePage === 1}
                                onClick={() => setCurrentPage(safePage - 1)}
                            >
                                ← Précédent
                            </button>
                            <span>
                                Page {safePage} / {totalPages}
                            </span>
                            <button
                                className="btn btn-outline-dark"
                                disabled={safePage === totalPages}
                                onClick={() => setCurrentPage(safePage + 1)}
                            >
                                Suivant →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}