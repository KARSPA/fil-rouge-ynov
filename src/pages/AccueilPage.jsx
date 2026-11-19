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

// Six offres par page : trois rangées de deux colonnes dans la grille
const OFFRES_PAR_PAGE = 6;

/**
 * Accueil : bannière, recherche plein texte, filtres par domaine,
 * grille paginée des offres.
 *
 * Deux couches de données :
 * - offers          : toutes les offres chargées de l'API (la source locale)
 * - displayedOffers : ce qui reste après recherche et/ou filtres
 */
export default function AccueilPage() {
  // ===== Session =====
  const { user } = useAuth();

  // ===== Données =====
  const [offers, setOffers] = useState([]);
  const [displayedOffers, setDisplayedOffers] = useState([]);

  // ===== Recherche =====
  const [search, setSearch] = useState("");

  // ===== Filtres par domaine =====
  // searchDomains : un case à cocher par domaine ; allDomains : true = rien de filtré
  const [searchDomains, setSearchDomains] = useState(DOMAINES_DEFAULT_FILTERS);
  const [allDomains, setAllDomains] = useState(true);

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);

  // Nombre total de pages (minimum 1, même sans résultat)
  const totalPages = Math.max(
    1,
    Math.ceil(displayedOffers.length / OFFRES_PAR_PAGE)
  );

  // Page demandée, recalée si elle dépasse après un filtre ou une recherche
  const safePage = Math.min(currentPage, totalPages);

  // Découpage de la page courante
  const startIndex = (safePage - 1) * OFFRES_PAR_PAGE;
  const paginatedOffers = displayedOffers.slice(
    startIndex,
    startIndex + OFFRES_PAR_PAGE
  );

  /**
   * Recherche plein texte : titre, entreprise et description.
   * Remplace la source locale, puis remet filtres et page à zéro.
   */
  function onSearch(terme) {
    setSearch(terme);

    const filters = [
      { name: "titre", value: terme },
      { name: "entreprise", value: terme },
      { name: "description", value: terme },
    ];

    getOffresWithStringFilter(filters)
      .then((data) => {
        setOffers(data);
        setDisplayedOffers(data);
        setCurrentPage(1);
        setSearchDomains(DOMAINES_DEFAULT_FILTERS);
        setAllDomains(true);
      })
      .catch((error) => console.error(error));
  }

  /**
   * "Aucun Filtre" : décoche tous les domaines,
   * réaffiche toutes les offres en mémoire, page 1.
   */
  function handleAllDomainFilterChange() {
    setSearchDomains(DOMAINES_DEFAULT_FILTERS);
    setAllDomains(true);
    setDisplayedOffers([...offers]);
    setCurrentPage(1);
  }

  /**
   * Case d'un domaine : inverse sa case, recalcul des offres affichées.
   * Aucune case cochée = tout afficher ; sinon on garde les offres
   * dont le domaine est coché. Page 1 à chaque changement.
   */
  function handleDomainFilterChange(domainIndex) {
    const updatedDomains = searchDomains.map((domain, index) => ({
      ...domain,
      checked: index === domainIndex ? !domain.checked : domain.checked,
    }));

    setSearchDomains(updatedDomains);

    const selectedDomains = updatedDomains.filter((domain) => domain.checked);

    if (selectedDomains.length === 0) {
      setDisplayedOffers([...offers]);
      setAllDomains(true);
    } else {
      const domainMap = {};
      updatedDomains.forEach((domain) => {
        domainMap[domain.domaine] = domain.checked;
      });
      setDisplayedOffers(offers.filter((offre) => domainMap[offre.domaine]));
      setAllDomains(false);
    }

    setCurrentPage(1);
  }

  // ===== Chargement initial : toutes les offres de l'API =====
  useEffect(() => {
    getOffres()
      .then((data) => {
        setOffers(data);
        setDisplayedOffers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      {/* Bannière de propagande */}
      <header className="banner text-center text-white py-4">
        <h1 className="text-uppercase fw-bold">Au Boulot !</h1>
        <p className="fst-italic mb-0">
          La plateforme qui te met un coup de pied aux fesses
        </p>
        <p className="fst-italic mb-0 pt-0">
          pour faire décoller ta recherche d'emploi !
        </p>
      </header>

      {/* Recherche plein texte */}
      <BarreRecherche search={search} onSearch={onSearch} />

      {/* Filtres par domaine : input invisible stylé par son label */}
      <Accordion defaultActiveKey="0" flush className="accordion-shadow">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtrer par domaine</Accordion.Header>
          <Accordion.Body>
            <div className="mb-0 position-relative">
              {/* "Aucun Filtre" */}
              <div className="position-absolute">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-all"
                  autoComplete="off"
                  checked={allDomains}
                  onChange={() => handleAllDomainFilterChange()}
                />
                <label
                  className={
                    "none-domain-filter-btn " + (allDomains ? "active" : "")
                  }
                  htmlFor="btn-check-all"
                >
                  Aucun Filtre
                </label>
              </div>

              {/* Un bouton-bascule par domaine */}
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {searchDomains.map((domaine, index) => (
                  <div key={domaine.domaine}>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`btn-check-${index}`}
                      autoComplete="off"
                      checked={domaine.checked}
                      onChange={() => handleDomainFilterChange(index)}
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

      <h2 className="rubrique mt-4">Les offres <span>({displayedOffers.length})</span></h2>

      <div className="cadre-offres mt-3 mb-5">
        {displayedOffers.length === 0 ? (
          /* Aucun résultat : message de propagande */
          <p className="text-center fst-italic mb-0">
            Aucune offre ! Sois fier travailleur, c&apos;est grâce à toi que le
            plein emploi est atteint !
          </p>
        ) : (
          <>
            {/* La grille : six cartes maximum par page */}
            <div className="grille-offres">
              {paginatedOffers.map((offre) => {
                // L'utilisateur a-t-il déjà postulé à cette offre ?
                const applied =
                  user?.offres?.includes(String(offre.id)) ?? false;

                return (
                  <OffreCarte key={offre.id} offre={offre} applied={applied} />
                );
              })}
            </div>

            {/* Pagination : affichée seulement si plus d'une page */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-3 pt-3 border-top">
                <button
                  className="btn-retour"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage(safePage - 1)}
                >
                  ← Précédent
                </button>

                <span>
                  Page {safePage} / {totalPages}
                </span>

                <button
                  className="btn-retour"
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage(safePage + 1)}
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}