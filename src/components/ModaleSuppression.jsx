import Modal from "react-bootstrap/Modal";

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
            {/* Plus de croix : le titre peut être VRAIMENT centré,
                et on force un choix explicite entre les deux boutons */}
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
                    trouver un emploi, et les informations de l'annonce ne pourront
                    pas être récupérées.
                </p>
                <p className="text-center fst-italic mb-0">
                    Pour revenir en arrière, clique sur le bouton "Annuler".
                </p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center border-0 pb-4">
                <button
                    className="btn-actions-bandeau btn-actions-suppr modale-confirm"
                    onClick={handleDelete}
                >
                    {/* Les deux textes : CSS swappe au survol */}
                    <span className="texte-question">Tu es sûr ?</span>
                    <span className="texte-confirm">Je confirme</span>
                </button>
                <button className="btn-actions-bandeau" onClick={onHide}>
                    Annuler
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModaleSuppression;