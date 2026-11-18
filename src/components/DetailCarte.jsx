function DetailCarte({ offer }) {
  return (
    <>
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
      </div>
    </>
  );
}
export default DetailCarte;
