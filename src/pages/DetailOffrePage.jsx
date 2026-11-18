import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteOffre,
  getOfferById,
  modifyOffer,
} from "../services/offresService";
import { DOMAINES, TYPE_CONTRAT } from "../assets/constantes.js";
import DetailCarte from "../components/DetailCarte.jsx";
import ModaleSuppression from "../components/ModaleSuppression.jsx";
import { useNavigate } from "react-router-dom";
function DetailOffrePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Offre
  const [offer, setOffer] = useState(null);

  // Variable Modification de l'annonce
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

  // Variables Modale
  useEffect(() => {
    getOfferById(id)
      .then((data) => {
        setOffer(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  // Initialisation lors de la modification
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
  }

  // Envoi du formulaire
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
      };

      await modifyOffer(id, newOffer);
      setModify(false);
      setOffer({ ...offer, ...newOffer });
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la modification de l'annonce.");
    }
  }

  // Modale

  const [modalShow, setModalShow] = useState(false);

  function handleDelete() {
    try {
      deleteOffre(id);
      navigate("/");
    } catch (error) {
      console.error("Error :", error);
      alert("L'annonce n'a pas pu être supprimée.");
    }
  }
  if (!offer) {
    return <p className='container mt-5'> Chargement...</p>;
  }
  if (modify) {
    return (
      <div className='container mt-5'>
        <form className='row'>
          <label className='form-label'>Titre</label>
          <input
            className='form-control mb-3'
            value={titre}
            placeholder="Titre de l'annonce"
            required='required'
            onChange={(e) => setTitre(e.target.value)}
          />

          <label className='form-label'>Description de l'annonce</label>
          <textarea
            className='form-control mb-2'
            id='description'
            placeholder="Décrivez les missions, l'équipe, etc ..."
            style={{ height: 200 + "px" }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required='required'
          ></textarea>
          <div className='col-md-4'>
            <label className='form-label'>Entreprise</label>
            <input
              className='form-control mb-3'
              value={entreprise}
              placeholder='Entreprise'
              required='required'
              onChange={(e) => setEntreprise(e.target.value)}
            />
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Type de contrat</label>
            <select
              required='required'
              id='contrat'
              className='form-select'
              onChange={(e) => {
                setContrat(e.target.value);
              }}
              value={contrat}
            >
              <option value=''>Choisir ...</option>
              {TYPE_CONTRAT.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-4'>
            <label htmlFor='domaine' className='form-label'>
              Domaine
            </label>
            <select
              required='required'
              id='domaine'
              className='form-select'
              onChange={(e) => {
                setDomaine(e.target.value);
              }}
              value={domaine}
            >
              <option value=''>Choisir ...</option>
              {DOMAINES.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-4'>
            <label htmlFor='salaireMin' className='form-label'>
              Salaire annuel minimum :
            </label>
            <input
              required='required'
              type='number'
              className='form-control'
              id='salaireMin'
              onChange={(e) => {
                setSalaireMin(Number(e.target.value));
              }}
              value={salaireAnnuelMin}
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor='salaireMax' className='form-label'>
              Salaire annuel maximum :
            </label>
            <input
              type='number'
              className='form-control'
              id='salaireMax'
              required='required'
              value={salaireAnnuelMax}
              onChange={(e) => {
                setSalaireMax(Number(e.target.value));
              }}
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor='expAnneeMini' className='form-label'>
              Années d'expériences requises :
            </label>
            <input
              type='number'
              className='form-control'
              id='expAnneeMini'
              required='required'
              onChange={(e) => {
                setMinExp(Number(e.target.value));
              }}
              value={expAnneeMini}
            />
          </div>
          <div className='col-md-8'>
            <label htmlFor='ville' className='form-label'>
              Lieu
            </label>
            <input
              type='text'
              className='form-control'
              id='ville'
              required='required'
              onChange={(e) => {
                lieu(e.target.value);
              }}
              value={lieu}
            />
          </div>
        </form>
        {/*Admin actions*/}
        <br />
        <button
          onClick={(e) => handleSubmitModif(e)}
          className='text-success-emphasis bg-success-subtle btn me-2'
        >
          Valider la modification
        </button>

        <button
          onClick={() => setModify(false)}
          className='text-secondary-emphasis bg-secondary-subtle btn me-2'
        >
          Annuler
        </button>
      </div>
    );
  }
  return (
    <>
      <div className='container mt-5'>
        <DetailCarte offer={offer} />
        {/*Admin actions*/}
        <div className='mt-2'>
          <button
            onClick={handleModifyButton}
            className='text-warning-emphasis bg-warning-subtle btn me-2'
          >
            Modifier l'offre
          </button>
          <button
            className='text-danger-emphasis bg-danger-subtle btn'
            onClick={() => setModalShow(true)}
          >
            Supprimer l'offre
          </button>
        </div>
      </div>

      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <ModaleSuppression
          show={modalShow}
          handleDelete={handleDelete}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}

export default DetailOffrePage;
