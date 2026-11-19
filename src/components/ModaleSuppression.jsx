import Modal from "react-bootstrap/Modal";

/**
 * La modale de confirmation de suppression (page détail, admin).
 * Elle est volontairement muette : elle reçoit show, la fermeture
 * et l'action, mais ne décide de rien toute seule.
 *
 * Particularité DA : le bouton de confirmation échange son texte
 * "Tu es sûr ?" contre "Je confirme" au survol (le CSS fait le swap),
 * et il n'y a pas de croix de fermeture : le choix doit être explicite.
 *
 * @param show         la modale est-elle ouverte
 * @param onHide        fermer sans rien casser (bouton "Annuler", clic dehors)
 * @param handleDelete  supprimer l'offre, APRES confirmation
 */
function ModaleSuppression({ show, onHide, handleDelete }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            contentClassName="modale-da-content"
            aria-labelledby="contained-modal-title-vcenter"
        >
            {/* L'en-tête sans croix : le titre peut être centré,
                et la sortie demande un vrai clic réfléchi */}
            <Modal.Header className="border-0 pb-0">
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="auth-titre mx-auto"
                >
                    Important
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center fst-italic mb-2">
                    Si tu confirmes la suppression, tu empêcheras un travailleur de
                    trouver un emploi, et les informations de l'offre ne pourront
                    pas être récupérées.
                </p>
                <p className="text-center fst-italic mb-0">
                    Pour revenir en arrière, clique sur le bouton "Annuler".
                </p>
            </Modal.Body>

            <Modal.Footer className="justify-content-center border-0 pb-4">
                {/* Le confirmateur : deux textes, le CSS swappe au survol
                    (min-width dans la classe : la largeur ne bouge pas) */}
                <button
                    className="btn-actions-bandeau btn-actions-suppr modale-confirm"
                    onClick={handleDelete}
                >
                    <span className="texte-question">Tu es sûr ?</span>
                    <span className="texte-confirm">Je confirme</span>
                </button>

                {/* La porte de sortie honnête */}
                <button className="btn-actions-bandeau" onClick={onHide}>
                    Annuler
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModaleSuppression;