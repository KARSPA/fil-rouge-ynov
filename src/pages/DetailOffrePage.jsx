import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOfferById } from "../services/offresService";

function DetailOffrePage() {
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
          <button className='text-warning-emphasis bg-warning-subtle btn me-2'>
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
