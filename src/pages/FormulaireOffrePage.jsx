import { useEffect, useState } from "react";
import { getOfferById } from "../services/offresService";
import { useParams } from "react-router";
function FormulaireOffrePage() {
  const { id } = useParams();

  const [offer, setOffer] = useState(null);

  useEffect(() => {
    getOfferById(id)
      .then((data) => {
        setOffer(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!offer) {
    return <p className='container mt-5'> Chargement...</p>;
  }
  return (
    <div className='container mt-5'>
      <div>
        <h1 className='h1'>{offer.titre}</h1>
        <span className='h3'>{offer.entreprise} - </span>
        <span className='h3 text-secondary'>Lieu</span>
        <p className='mt-4'>{offer.description}</p>
        <div className='my-4'>
          <p className='mb-0 fw-semibold'>Salaire annuel :</p>
          <span className='badge bg-primary-subtle text-primary'>
            {offer.salaireAnnuelMin}€
          </span>
          <span> - </span>
          <span className='badge bg-primary-subtle text-primary'>
            {offer.salaireAnnuelMax}€
          </span>
        </div>
        <p>
          Année{offer.expAnneeMini > 1 ? "s" : ""} d'expérience minimum :
          {" " + offer.expAnneeMini} ans.
        </p>
        {/*Admin actions*/}
        <button className='text-warning-emphasis bg-warning-subtle btn me-2'>
          Modifier l'offre
        </button>
        <button className='text-danger-emphasis bg-danger-subtle btn'>
          Supprimer l'offre
        </button>
      </div>
    </div>
  );
}

export default FormulaireOffrePage;
