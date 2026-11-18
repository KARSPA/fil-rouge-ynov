import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOfferById, modifyOffer } from "../services/offresService";
import { DOMAINES, TYPE_CONTRAT } from "../assets/constantes.js";

function DetailOffrePage() {
  const { id } = useParams();

  const [offer, setOffer] = useState(null);
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
  useEffect(() => {
    getOfferById(id)
      .then((data) => {
        setOffer(data);
      })
      .catch((error) => console.error(error));
  }, [id]);
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
    <div className='container mt-5'>
      <div>
        <h1 className='h1'>{offer.titre}</h1>
        <span className='h3'>{offer.entreprise} - </span>
        <span className='h3 text-secondary'>{offer.lieu}</span>
        <h5 className='text-secondary'>{offer.datePublication}</h5>
        <p className='mt-4 col-6'>{offer.description}</p>
        <span className='mb-0 fw-semibold'>Contrat : </span>
        <span>{offer.contrat}</span>
        <div className='my-2'>
          <p className='mb-0 fw-semibold'>Salaire annuel :</p>
          <span className='badge bg-primary-subtle text-primary'>
            {offer.salaireAnnuelMin}€
          </span>
          <span> - </span>
          <span className='badge bg-primary-subtle text-primary'>
            {offer.salaireAnnuelMax}€
          </span>
        </div>
        <span className='mb-0 fw-semibold'>
          Année{offer.expAnneeMini > 1 ? "s" : ""} d'expérience minimum :
        </span>
        <span>{" " + offer.expAnneeMini} ans.</span>

        {/*Admin actions*/}
        <div className='mt-2'>
          <button
            onClick={handleModifyButton}
            className='text-warning-emphasis bg-warning-subtle btn me-2'
          >
            Modifier l'offre
          </button>
          <button className='text-danger-emphasis bg-danger-subtle btn'>
            Supprimer l'offre
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailOffrePage;
