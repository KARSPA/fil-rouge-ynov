import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModaleSuppression(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Important :
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Suppression de l'offre</h4>
        <p>
          Si vous confirmez la suppression de cette offre, ses informations ne
          pourrons pas être récupérées. Pour revenir en arrière, veuillez
          cliquer sur le bouton "Annuler".
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-danger' onClick={props.handleDelete}>
          Confirmer la suppression
        </Button>
        <Button className='btn btn-secondary' onClick={props.onHide}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModaleSuppression;
