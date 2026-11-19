import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    deleteOffre,
    getOfferById,
    modifyOffer,
} from "../services/offresService";
import { applyOffer, getUsers } from "../services/authService";
import { DOMAINES, TYPE_CONTRAT } from "../assets/constantes.js";
import useAuth from "../hooks/useAuth";
import ModaleSuppression from "../components/ModaleSuppression.jsx";

/**
 * Fiche détail d'une offre : un composant, trois visages selon la session.
 * - Visiteur : bandeau bleu pâle, appel à la connexion
 * - Travailleur : bandeau bleu pâle, candidature ("Embauche-moi !")
 * - Admin : bandeau rouge, modification et suppression
 *
 * Deux sous-modes en plus : affichage (par défaut) et modification
 * (le state `modify` bascule l'un ou l'autre).
 */
function DetailOffrePage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ===== Session =====
    const { user, login } = useAuth();
    const isAdmin = user?.role === "admin";

    // ===== L'offre affichée =====
    const [offer, setOffer] = useState(null);
    const [erreur, setErreur] = useState(null);
    const [message, setMessage] = useState("");

    // ===== Mode modification : un state par champ du formulaire =====
    const [modify, setModify] = useState(false);
    const [titre, setTitre] = useState("");
    const [lieu, setLieu] = useState("");
    const [description, setDescription] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [salaireAnnuelMin, setSalaireMin] = useState(null);
    const [salaireAnnuelMax, setSalaireMax] = useState(null);
    const [contrat, setContrat] = useState(null);
    const [domaine, setDomaine] = useState(null);
    const [expAnneeMini, setMinExp] = useState(null);

    // ===== Modale de suppression : ouverte par le bouton admin =====
    // (déclarée avant les early returns : règle des hooks)
    const [modalShow, setModalShow] = useState(false);

    // ===== Chargement de l'offre, relancé à chaque changement d'id =====
    useEffect(() => {
        setOffer(null);
        setErreur(null);
        getOfferById(id)
            .then(data => setOffer(data))
            .catch(error => {
                console.error(error);
                setErreur("Offre introuvable. Elle a peut-être été supprimée.");
            });
    }, [id]);

    // ===== Entrer en mode modification : pré-remplissage des champs =====
    function handleModifyButton() {
        setTitre(offer.titre);
        setLieu(offer.lieu);
        setDescription(offer.description);
        setEntreprise(offer.entreprise);
        setSalaireMin(offer.salaireAnnuelMin);
        setSalaireMax(offer.salaireAnnuelMax);
        setContrat(offer.contrat);
        setMinExp(offer.expAnneeMini);
        setDomaine(offer.domaine);
        setModify(true);
        setMessage("");
    }

    /**
     * Valider la modification : envoie l'offre complète (la date
     * de publication est conservée), met la fiche à jour localement,
     * quitte le mode modification, confirme par message.
     */
    async function handleSubmitModif(e) {
        e.preventDefault();
        try {
            const newOffer = {
                titre,
                entreprise,
                lieu,
                description,
                contrat,
                domaine,
                expAnneeMini,
                salaireAnnuelMin,
                salaireAnnuelMax,
                datePublication: offer.datePublication,
            };
            await modifyOffer(id, newOffer);
            setOffer({ ...offer, ...newOffer });
            setModify(false);
            setMessage("Offre modifiée avec succès !");
        } catch (error) {
            console.error("Error:", error);
            setMessage("Erreur lors de la modification de l'offre.");
        }
    }

    /**
     * Suppression : exécutée par la modale après confirmation.
     * Succès -> retour à l'accueil ; échec -> modale fermée + message.
     */
    async function handleDelete() {
        try {
            await deleteOffre(id);
            navigate("/");
        } catch (error) {
            console.error("Error :", error);
            setModalShow(false);
            setMessage("L'offre n'a pas pu être supprimée.");
        }
    }

    /**
     * Postuler : ajoute l'offre au carnet de l'utilisateur, puis recharge
     * le user depuis l'API et le renvoie au contexte via login() :
     * le badge "Déjà postulé" apparaît sans recréer de session.
     */
    async function handlePostuler() {
        try {
            await applyOffer(user.id, String(offer.id));
            const users = await getUsers();
            const userMaJ = users.find(u => String(u.id) === String(user.id));
            login(userMaJ);
            setMessage("Candidature enregistrée ! Tiens-toi prêt à pointer !");
        } catch (error) {
            console.error(error);
            setMessage("Impossible d'enregistrer ta candidature.");
        }
    }

    // ===== Offre introuvable : page d'erreur =====
    if (erreur) {
        return (
            <div className="container mt-5 text-center">
                <h1 className="rubrique d-inline-block">Erreur</h1>
                <p className="mt-3">{erreur}</p>
                <Link to="/" className="btn-retour">← Retour aux offres</Link>
            </div>
        );
    }

    // ===== Chargement en cours =====
    if (!offer) {
        return <p className="container mt-5">Chargement...</p>;
    }

    // ==================== MODE MODIFICATION ====================
    if (modify) {
        return (
            <div className="container mt-4 mb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="fiche-offre p-4">
                            <h1 className="auth-titre fs-4 mb-4">
                                Réformer l'affiche !
                            </h1>

                            {/* Le formulaire a un id : le bouton "Valider"
                                vit dans le bandeau, hors de la fiche */}
                            <form id="form-modif" onSubmit={handleSubmitModif}>
                                <label className="form-label fw-bold" htmlFor="titre-modif">Titre</label>
                                <input
                                    id="titre-modif"
                                    className="form-control auth-input mb-3"
                                    value={titre}
                                    placeholder="Titre de l'offre"
                                    required
                                    onChange={e => setTitre(e.target.value)}
                                />

                                <label className="form-label fw-bold" htmlFor="description">
                                    Description de l'offre
                                </label>
                                <textarea
                                    id="description"
                                    className="form-control auth-input mb-3"
                                    placeholder="Décrivez les missions, l'équipe, etc..."
                                    style={{ height: 200 }}
                                    value={description}
                                    required
                                    onChange={e => setDescription(e.target.value)}
                                ></textarea>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-bold" htmlFor="entreprise">
                                            Entreprise
                                        </label>
                                        <input
                                            id="entreprise"
                                            className="form-control auth-input"
                                            value={entreprise}
                                            placeholder="Entreprise"
                                            required
                                            onChange={e => setEntreprise(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-bold" htmlFor="contrat">
                                            Type de contrat
                                        </label>
                                        <select
                                            id="contrat"
                                            className="form-select auth-input"
                                            required
                                            value={contrat}
                                            onChange={e => setContrat(e.target.value)}
                                        >
                                            <option value="">Choisir ...</option>
                                            {TYPE_CONTRAT.map(entry => (
                                                <option key={entry} value={entry}>{entry}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-bold" htmlFor="domaine">
                                            Domaine
                                        </label>
                                        <select
                                            id="domaine"
                                            className="form-select auth-input"
                                            required
                                            value={domaine}
                                            onChange={e => setDomaine(e.target.value)}
                                        >
                                            <option value="">Choisir ...</option>
                                            {DOMAINES.map(entry => (
                                                <option key={entry} value={entry}>{entry}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-bold" htmlFor="salaireMin">
                                            Salaire annuel minimum :
                                        </label>
                                        <input
                                            id="salaireMin"
                                            type="number"
                                            className="form-control auth-input"
                                            required
                                            value={salaireAnnuelMin}
                                            onChange={e => setSalaireMin(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-bold" htmlFor="salaireMax">
                                            Salaire annuel maximum :
                                        </label>
                                        <input
                                            id="salaireMax"
                                            type="number"
                                            className="form-control auth-input"
                                            required
                                            value={salaireAnnuelMax}
                                            onChange={e => setSalaireMax(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-bold" htmlFor="expAnneeMini">
                                            Années d'expérience requises :
                                        </label>
                                        <input
                                            id="expAnneeMini"
                                            type="number"
                                            className="form-control auth-input"
                                            required
                                            value={expAnneeMini}
                                            onChange={e => setMinExp(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold" htmlFor="ville">
                                            Lieu
                                        </label>
                                        <input
                                            id="ville"
                                            type="text"
                                            className="form-control auth-input"
                                            required
                                            value={lieu}
                                            onChange={e => setLieu(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Le bandeau de validation : le rouge des actions
                            sur une offre existante, comme la fiche admin */}
                        <div className="bandeau-actions d-flex justify-content-center py-3">
                            <button
                                type="submit"
                                form="form-modif"
                                className="btn-actions-bandeau btn-actions-modif py-2 px-4"
                            >
                                Valider la modification
                            </button>
                        </div>

                        {/* L'abandon : annule et ramène aux offres */}
                        <div className="text-center mt-3">
                            <button
                                type="button"
                                className="btn-retour"
                                onClick={() => navigate("/")}
                            >
                                ← Annuler et retour aux offres
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ==================== MODE AFFICHAGE ====================
    return (
        <>
            <div className="container mt-4 mb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-9">

                        {/* Message de succès ou d'échec, au-dessus de la fiche */}
                        {message && (
                            <p className="fiche-message mb-3">{message}</p>
                        )}

                        <div className="fiche-offre p-4">

                            {/* En-tête : photo à gauche, identité et infos à droite */}
                            <div className="d-flex gap-3 align-items-start">
                                <img
                                    src="https://placehold.co/400x250"
                                    alt="image offre"
                                    className="fiche-offre-img flex-shrink-0"
                                />
                                <div>
                                    <h1 className="fs-3 mb-1">{offer.titre}</h1>
                                    <p className="mb-2 fst-italic">{offer.entreprise}</p>

                                    {/* Les badges d'information */}
                                    <div className="d-flex flex-wrap gap-2">
                                        <span className="badge badge-info">{offer.domaine}</span>
                                        <span className="badge badge-info">{offer.contrat}</span>
                                        <span className="badge badge-info">{offer.lieu}</span>
                                        <span className="badge badge-info">
                                            {offer.salaireAnnuelMin} - {offer.salaireAnnuelMax} € / an
                                        </span>
                                        <span className="badge badge-info">
                                            Exp : {offer.expAnneeMini} an(s)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* La description, puis la date */}
                            <p className="mt-4">{offer.description}</p>
                            <p className="fst-italic text-secondary mt-4 mb-0">
                                Publiée le : {offer.datePublication}
                            </p>
                        </div>

                        {/* Le bandeau d'actions : rouge pour l'admin,
                            bleu pâle pour le visiteur et le travailleur */}
                        <div
                            className={
                                (isAdmin ? "bandeau-actions" : "bandeau-positif") +
                                " d-flex justify-content-center gap-3 py-3"
                            }
                        >
                            {/* Visiteur : appel à la connexion */}
                            {!user && (
                                <Link to="/connexion" className="btn-actions-bandeau">
                                    Connecte-toi et rejoins les rangs !
                                </Link>
                            )}

                            {/* Travailleur : candidature ; désactivé si déjà postulé */}
                            {user && !isAdmin && (
                                <button
                                    className="btn-actions-bandeau"
                                    onClick={handlePostuler}
                                    disabled={user?.offres?.includes(String(offer.id))}
                                >
                                    {user?.offres?.includes(String(offer.id))
                                        ? "Déjà sur le coup !"
                                        : "Embauche-moi !"}
                                </button>
                            )}

                            {/* Admin : modification et suppression */}
                            {isAdmin && (
                                <>
                                    <button
                                        className="btn-actions-bandeau btn-actions-modif"
                                        onClick={handleModifyButton}
                                    >
                                        Modifier l'offre
                                    </button>
                                    <button
                                        className="btn-actions-bandeau btn-actions-suppr"
                                        onClick={() => setModalShow(true)}
                                    >
                                        Supprimer l'offre
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Le retour discret */}
                        <div className="text-center mt-3">
                            <Link to="/" className="btn-retour">← Retour aux offres</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* La modale : react-bootstrap la rend dans le body via un portal */}
            <ModaleSuppression
                show={modalShow}
                handleDelete={handleDelete}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default DetailOffrePage;