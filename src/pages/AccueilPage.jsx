import { useEffect, useState } from "react";
import {
  getOffres,
  getOffresWithStringFilter,
} from "../services/offresService.js";
import BarreRecherche from "../components/BarreRecherche.jsx";
import OffreCarte from "../components/OffreCarte.jsx";
import { DOMAINES_DEFAULT_FILTERS } from "../assets/constantes.js";
import { Accordion } from "react-bootstrap";
import useAuth from "../hooks/useAuth.js";

// const OFFRES_PAR_PAGE = 6; // 3 rangées de 2 colonnes

export default function AccueilPage() {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [displayedOffers, setDisplayedOffers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const [searchDomains, setSearchDomains] = useState(DOMAINES_DEFAULT_FILTERS);
  const [allDomains, setAllDomains] = useState(true);

  function onSearch(search) {
    setSearch(search);

    const filters = [
      { name: "titre", value: search },
      { name: "entreprise", value: search },
      { name: "description", value: search },
    ];

    getOffresWithStringFilter(filters)
      .then((data) => {
        setOffers(data);
        setDisplayedOffers(data);
      })
      .catch((error) => console.log(error));
  }

  function handleAllDomainFilterChange() {
    // Lors d'un clic sur ce filtre, on désactive tous les autres ET on coche celui ci
    setSearchDomains(DOMAINES_DEFAULT_FILTERS);

    setAllDomains(true);
    setDisplayedOffers([...offers]);
  }

  function handleDomainFilterChange(e, domainIndex) {
    // On modifie le tableau de recherche par domaine pour avoir l'input de l'user ...
    let domainsCopy = [...searchDomains];
    domainsCopy[domainIndex].checked = !domainsCopy[domainIndex].checked;
    setSearchDomains(domainsCopy);

    // Vérifier si aucun filtre n'est coché, on affiche tout ET on coche le 'Aucun filtre' :
    if (searchDomains.every((domain) => !domain.checked)) {
      setDisplayedOffers([...offers]);
      setAllDomains(true);
    } else {
      // Si au moins un filtre est coché, on fait la filtration ET on décoche 'Aunun filtre'
      const domainMap = createDomainMap();
      setDisplayedOffers(
        offers.filter((offre) => predicateFilterDomain(offre, domainMap)),
      );

      setAllDomains(false);
    }
  }

  function createDomainMap() {
    let map = {};
    searchDomains.forEach((domain) => {
      map[domain.domaine] = domain.checked;
    });
    return map;
  }

  function predicateFilterDomain(offre, domainMap) {
    // On garde les offres dont le nom de domaine est checké

    return domainMap[offre.domaine];
  }

  useEffect(() => {
    getOffres()
      .then((data) => {
        setOffers(data);
        setDisplayedOffers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='container mt-4'>
      <header className='banner text-center text-white py-4'>
        <h1 className='text-uppercase fw-bold'>Au Boulot !</h1>
        <p className='fst-italic mb-0'>
          La plateforme qui te met un coup de pied aux fesses
        </p>
        <p className='fst-italic mb-0 pt-0'>
          pour faire décoller ta recherche d'emploi !
        </p>
      </header>

      {/* Barre de recherche : ton composant existant,
                le branchement réel sera fait ultérieurement*/}
      <BarreRecherche search={search} onSearch={onSearch} />

      <Accordion defaultActiveKey='0' flush className='accordion-shadow'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Filtrer par domaines</Accordion.Header>
          <Accordion.Body>
            <div className='mb-0 position-relative'>
              <div className='position-absolute'>
                <input
                  type='checkbox'
                  className='btn-check'
                  id={`btn-check-all`}
                  autoComplete='off'
                  checked={allDomains}
                  onChange={() => handleAllDomainFilterChange()}
                />
                <label
                  className={
                    "none-domain-filter-btn " + (allDomains ? "active" : "")
                  }
                  htmlFor={`btn-check-all`}
                >
                  Aucun Filtre
                </label>
              </div>
              <div className='d-flex flex-wrap gap-3 justify-content-center'>
                {searchDomains.map((domaine, index) => (
                  <div>
                    <input
                      type='checkbox'
                      className='btn-check'
                      id={`btn-check-${index}`}
                      autoComplete='off'
                      checked={domaine.checked}
                      onChange={(e) => handleDomainFilterChange(e, index)}
                    />
                    <label
                      className={
                        "checkbox-filter-btn " +
                        (domaine.checked ? "active" : "")
                      }
                      htmlFor={`btn-check-${index}`}
                    >
                      {domaine.domaine}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h2 className='rubrique mt-4'>Les offres</h2>

      <div className='cadre-offres mt-3 mb-5'>
        {false ? (
          <p className='text-center fst-italic mb-0'>
            Aucune offre ! Soyez fiers travailleurs, c'est grâce à vous que le
            plein emploi est atteint !
          </p>
        ) : (
          <>
            <div className='grille-offres'>
              {displayedOffers.map((offre) => {
                const applied =
                  user?.offres?.includes(String(offre.id)) ?? false;

                return (
                  <OffreCarte key={offre.id} offre={offre} applied={applied} />
                );
              })}
            </div>

            {/*<div className='d-flex justify-content-center align-items-center gap-3 mt-3 pt-2 border-top'>*/}
            {/*  <button*/}
            {/*    className='btn btn-outline-dark'*/}
            {/*    disabled={safePage === 1}*/}
            {/*    onClick={() => setCurrentPage(safePage - 1)}*/}
            {/*  >*/}
            {/*    ← Précédent*/}
            {/*  </button>*/}
            {/*  <span>*/}
            {/*    Page {safePage} / {totalPages}*/}
            {/*  </span>*/}
            {/*  <button*/}
            {/*    className='btn btn-outline-dark'*/}
            {/*    disabled={safePage === totalPages}*/}
            {/*    onClick={() => setCurrentPage(safePage + 1)}*/}
            {/*  >*/}
            {/*    Suivant →*/}
            {/*  </button>*/}
            {/*</div>*/}
          </>
        )}
      </div>
    </div>
  );
}
