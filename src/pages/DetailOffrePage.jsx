import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOfferById, modifyOffer } from "../services/offresService";

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
    setModify(true);
  }
  async function handleSubmitModif() {
    try {
      const newOffer = {
        titre,
        entreprise,
        lieu,
        description,
        contrat,
        expAnneeMini: Number(expAnneeMini),
        salaireAnnuelMin: Number(salaireAnnuelMin),
        salaireAnnuelMax: Number(salaireAnnuelMax),
      };

      await modifyOffer(id, newOffer);
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
        <form>
          <label>Titre</label>
          <input
            className='form-control mb-3'
            value={titre}
            placeholder="Titre de l'annonce"
            required='required'
            onChange={(e) => setTitre(e.target.value)}
          />
          <label>Entreprise</label>
          <input
            className='form-control mb-3'
            value={entreprise}
            placeholder='Entreprise'
            required='required'
            onChange={(e) => setEntreprise(e.target.value)}
          />
          <label>Lieu de l'annonce</label>
          <input
            className='form-control mb-3'
            value={lieu}
            placeholder="Lieu de l'annonce"
            required='required'
            onChange={(e) => setLieu(e.target.value)}
          />
          <label>Description de l'annonce</label>
          <textarea
            className='form-control mb-3'
            value={description}
            placeholder="Description de l'annonce"
            required='required'
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Type de contrat</label>
          <input
            className='form-control mb-3'
            value={contrat}
            placeholder='CDI, CDD, ...'
            required='required'
            onChange={(e) => setContrat(e.target.value)}
          />
          <label>Années d'expérience</label>
          <input
            type='number'
            className='form-control mb-3'
            value={expAnneeMini}
            placeholder="Années d'expérience minimum"
            required='required'
            onChange={(e) => setMinExp(e.target.value)}
          />
          <input
            type='number'
            className=' mb-3 col-2'
            value={salaireAnnuelMin}
            placeholder='Salaire annuel minimum'
            required='required'
            onChange={(e) => setSalaireMin(e.target.value)}
          />
          <input
            type='number'
            className=' mb-3 col-2'
            value={salaireAnnuelMax}
            placeholder='Salaire annuel maximum'
            required='required'
            onChange={(e) => setSalaireMax(e.target.value)}
          />

          {/*Admin actions*/}
          <br />
          <button
            onClick={handleSubmitModif}
            className='text-success-emphasis bg-success-subtle btn me-2'
          >
            Valider la modification
          </button>
        </form>
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
