import Modal from "react-bootstrap/Modal";

/**
 * La modale d'abandon de saisie (formulaire de dépôt d'offre).
 * Elle ne sait qu'une chose : la saisie est en cours, est-ce qu'on
 * la jette ? Le composant reste muet : le formulaire lui dit quand
 * s'ouvrir, et récupère la décision via onHide / onConfirm.
 *
 * Même mécanique que la modale de suppression : pas de croix,
 * un bouton confirmateur au texte qui change au survol
 * ("Tu es sûr ?" devient "J'abandonne") pour forcer un clic réfléchi.
 *
 * @param show      la modale est-elle ouverte
 * @param onHide    rester sur la page, saisie intacte (bouton "Rester")
 * @param onConfirm jeter la saisie et sortir du formulaire
 */
function ModaleAnnulation({ show, onHide, onConfirm }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            contentClassName="modale-da-content"
            aria-labelledby="modale-annulation-titre"
        >
            {/* L'en-tête sans croix, titre centré : on force le choix */}
            <Modal.Header className="border-0 pb-0">
                <Modal.Title
                    id="modale-annulation-titre"
                    className="auth-titre mx-auto"
                >
                    Un instant !
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center fst-italic mb-2">
                    Si tu abandonnes maintenant, tout ce que tu as saisi
                    sera perdu, et un travailleur ne trouvera pas d'emploi.
                </p>
                <p className="text-center fst-italic mb-0">
                    Pour rester sur la page, clique sur "Rester".
                </p>
            </Modal.Body>

            <Modal.Footer className="justify-content-center border-0 pb-4">
                {/* L'abandon : deux textes, le CSS swappe au survol
                    (largeur stable grâce à min-width) */}
                <button
                    className="btn-actions-bandeau btn-actions-suppr modale-confirm"
                    onClick={onConfirm}
                >
                    <span className="texte-question">Tu es sûr ?</span>
                    <span className="texte-confirm">J'abandonne</span>
                </button>

                {/* La porte de sortie honnête : la saisie survit */}
                <button className="btn-actions-bandeau" onClick={onHide}>
                    Rester
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModaleAnnulation;