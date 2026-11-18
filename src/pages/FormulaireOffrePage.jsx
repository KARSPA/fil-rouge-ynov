import { useState } from "react";
import { DEPARTEMENTS, DOMAINES, TYPE_CONTRAT } from "../assets/constantes.js";
import { addOffer } from "../services/offresService.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import ModaleAnnulation from "../components/ModaleAnnulation.jsx";

// L'état vierge du formulaire : aussi la référence "rien n'est saisi"
// pour la modale de confirmation d'annulation
const defaultOffreForm = {
    titre: "",
    description: "",
    entreprise: "",
    contrat: "",
    domaine: "",
    ville: "",
    departementCP: "",
    salaireAnnuelMin: 0,
    salaireAnnuelMax: 100000,
    expAnneeMini: 0,
};

/**
 * Création d'une offre (réservée admin) : la fiche, le bandeau de
 * création bleu pâle, et le retour protégé par une confirmation.
 *
 * Le formulaire est un objet unique (offreForm) mis à jour champ par
 * champ via handleChange, plutôt que dix states séparés.
 */
function FormulaireOffrePage() {
    const navigate = useNavigate();

    // ===== Session =====
    const { user } = useAuth();

    // ===== Les champs du formulaire (un seul objet) =====
    const [offreForm, setOffreForm] = useState({ ...defaultOffreForm });

    // ===== La sortie de secours =====
    // Modale ouverte seulement si la saisie a commencé
    const [annulation, setAnnulation] = useState(false);

    // Le formulaire diffère-t-il de son état vierge ?
    const formulaireModifie =
        JSON.stringify(offreForm) !== JSON.stringify(defaultOffreForm);

    /**
     * Écrit dans un champ quelconque du formulaire.
     * @param champ  le nom de la clé dans offreForm
     * @param valeur la nouvelle valeur
     */
    function handleChange(champ, valeur) {
        setOffreForm({ ...offreForm, [champ]: valeur });
    }

    /**
     * Le retour : sortie directe si le formulaire est vierge,
     * modale de confirmation s'il y a une saisie à perdre.
     */
    function demanderSortie() {
        if (formulaireModifie) {
            setAnnulation(true);
        } else {
            navigate("/");
        }
    }

    /**
     * Déposer l'offre : la date du jour et le "lieu" assemblé
     * ("ville - code postal") se calculent à l'envoi, pas au clavier.
     * Succès -> retour à l'accueil (la nouvelle carte y attend).
     */
    function handleSubmit(e) {
        e.preventDefault();

        const today = new Date();
        const offre = {
            titre: offreForm.titre,
            description: offreForm.description,
            entreprise: offreForm.entreprise,
            contrat: offreForm.contrat,
            domaine: offreForm.domaine,
            lieu: `${offreForm.ville} - ${offreForm.departementCP}`,
            salaireAnnuelMin: offreForm.salaireAnnuelMin,
            salaireAnnuelMax: offreForm.salaireAnnuelMax,
            expAnneeMini: offreForm.expAnneeMini,
            datePublication: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        };

        addOffer(offre)
            .then(() => navigate("/"))
            .catch((err) => console.error(err));
    }

    // Garde-fou : un visiteur ou un non-admin ne voit jamais le formulaire
    if (!user || user.role !== "admin") {
        return null;
    }

    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="fiche-offre p-4">
                        {/* Le titre, pastille noire centrée */}
                        <h2 className="auth-titre mx-auto fs-4 mb-4">
                            Déposer une offre
                        </h2>

                        {/* Le formulaire a un id : le bouton "Créer un emploi !"
                            vit dans le bandeau, hors de la fiche */}
                        <form id="form-offre" className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="titre" className="form-label fw-bold">
                                    Titre
                                </label>
                                <input
                                    type="text"
                                    className="form-control auth-input"
                                    id="titre"
                                    placeholder="Titre de l'offre"
                                    value={offreForm.titre}
                                    required
                                    onChange={(e) => handleChange("titre", e.target.value)}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="description" className="form-label fw-bold">
                                    Description
                                </label>
                                <textarea
                                    className="form-control auth-input"
                                    id="description"
                                    placeholder="Décrivez les missions, l'équipe, etc ..."
                                    style={{ height: 200 }}
                                    value={offreForm.description}
                                    required
                                    onChange={(e) => handleChange("description", e.target.value)}
                                ></textarea>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <label htmlFor="entreprise" className="form-label fw-bold">
                                    Entreprise
                                </label>
                                <input
                                    type="text"
                                    className="form-control auth-input"
                                    id="entreprise"
                                    placeholder="Entreprise"
                                    value={offreForm.entreprise}
                                    required
                                    onChange={(e) => handleChange("entreprise", e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <label htmlFor="contrat" className="form-label fw-bold">
                                    Type de contrat
                                </label>
                                <select
                                    id="contrat"
                                    className="form-select auth-input"
                                    value={offreForm.contrat}
                                    required
                                    onChange={(e) => handleChange("contrat", e.target.value)}
                                >
                                    <option value="">Choisir ...</option>
                                    {TYPE_CONTRAT.map((entry) => (
                                        <option key={entry} value={entry}>
                                            {entry}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <label htmlFor="domaine" className="form-label fw-bold">
                                    Domaine
                                </label>
                                <select
                                    id="domaine"
                                    className="form-select auth-input"
                                    value={offreForm.domaine}
                                    required
                                    onChange={(e) => handleChange("domaine", e.target.value)}
                                >
                                    <option value="">Choisir ...</option>
                                    {DOMAINES.map((entry) => (
                                        <option key={entry} value={entry}>
                                            {entry}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <label htmlFor="salaireMin" className="form-label fw-bold">
                                    Salaire annuel minimum :
                                </label>
                                <input
                                    type="number"
                                    className="form-control auth-input"
                                    id="salaireMin"
                                    min="0"
                                    value={offreForm.salaireAnnuelMin}
                                    required
                                    onChange={(e) =>
                                        handleChange("salaireAnnuelMin", Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <label htmlFor="salaireMax" className="form-label fw-bold">
                                    Salaire annuel maximum :
                                </label>
                                <input
                                    type="number"
                                    className="form-control auth-input"
                                    id="salaireMax"
                                    min="0"
                                    value={offreForm.salaireAnnuelMax}
                                    required
                                    onChange={(e) =>
                                        handleChange("salaireAnnuelMax", Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <label htmlFor="expAnneeMini" className="form-label fw-bold">
                                    Années d'expérience requises :
                                </label>
                                <input
                                    type="number"
                                    className="form-control auth-input"
                                    id="expAnneeMini"
                                    min="0"
                                    value={offreForm.expAnneeMini}
                                    required
                                    onChange={(e) =>
                                        handleChange("expAnneeMini", Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-8">
                                <label htmlFor="ville" className="form-label fw-bold">
                                    Ville
                                </label>
                                <input
                                    type="text"
                                    className="form-control auth-input"
                                    id="ville"
                                    placeholder="Ville"
                                    value={offreForm.ville}
                                    required
                                    onChange={(e) => handleChange("ville", e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="departement" className="form-label fw-bold">
                                    Département
                                </label>
                                <select
                                    id="departement"
                                    className="form-select auth-input"
                                    value={offreForm.departementCP}
                                    required
                                    onChange={(e) => handleChange("departementCP", e.target.value)}
                                >
                                    <option value="">Choisir ...</option>
                                    {DEPARTEMENTS.map((entry) => (
                                        <option key={entry.CP} value={entry.CP}>
                                            {entry.CP} - {entry.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>

                    {/* Le bandeau de création : bleu pâle, on crée, pas de rouge */}
                    <div className="bandeau-positif d-flex justify-content-center py-3">
                        <button
                            type="submit"
                            form="form-offre"
                            className="btn-actions-bandeau py-2 px-4"
                        >
                            Créer un emploi !
                        </button>
                    </div>

                    {/* L'abandon : confirmation anti-misclic si la saisie a commencé */}
                    <div className="text-center mt-3">
                        <button type="button" className="btn-retour" onClick={demanderSortie}>
                            ← Annuler et retour aux offres
                        </button>
                    </div>
                </div>
            </div>

            {/* La modale d'abandon : elle seule décide si la saisie se perd */}
            <ModaleAnnulation
                show={annulation}
                onHide={() => setAnnulation(false)}
                onConfirm={() => navigate("/")}
            />
        </div>
    );
}

export default FormulaireOffrePage;