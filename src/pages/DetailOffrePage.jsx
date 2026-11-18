import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteOffre,
  getOfferById,
  modifyOffer,
} from "../services/offresService";
import { DOMAINES, TYPE_CONTRAT } from "../assets/constantes.js";
import useAuth from "../hooks/useAuth";
import ModaleSuppression from "../components/ModaleSuppression.jsx";
import { applyOffer } from "../services/authService.js";

function DetailOffrePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ===== Couche AUTH : le rôle vient du contexte partagé =====
  const { user, addOffer } = useAuth();

  const isAdmin = user?.role === "admin";
  const [postule, setPostule] = useState(false);
  // ===== L'offre affichée =====
  const [offer, setOffer] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [message, setMessage] = useState("");

  // ===== Mode modification : les champs du formulaire =====
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

  // ===== Modale de confirmation (AVANT tout early return : Rules of Hooks) =====
  const [modalShow, setModalShow] = useState(false);

  // ===== Chargement de l'offre =====
  useEffect(() => {
    getOfferById(id)
      .then((data) => setOffer(data))
      .catch((error) => {
        console.error(error);
        setErreur("Offre introuvable. Elle a peut-être été supprimée.");
      });
  }, [id]);

  // ===== Entrer en mode modification : pré-remplissage =====
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
    setMessage("");
  }

  // ===== Valider la modification =====
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
        datePublication: offer.datePublication,
      };
      await modifyOffer(id, newOffer);
      setOffer({ ...offer, ...newOffer });
      setModify(false);
      setMessage("Offre modifiée avec succès !");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Erreur lors de la modification de l'annonce.");
    }
  }
  useEffect(() => {
    if (user?.offres && id) {
      setPostule(user.offres.includes(String(id)));
    } else {
      setPostule(false);
    }
  }, [user, id]);
  async function handleApplyOffer() {
    try {
      await applyOffer(user.id, id);

      addOffer(id);

      setPostule(true);
      setMessage("Candidature envoyée !");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'envoi de la candidature");
    }
  }
  function handleAnnuler() {
    setModify(false);
    setMessage("");
  }

  // ===== Suppression : exécutée après confirmation de la modale =====
  async function handleDelete() {
    try {
      await deleteOffre(id);
      navigate("/");
    } catch (error) {
      console.error("Error :", error);
      setModalShow(false);
      setMessage("L'annonce n'a pas pu être supprimée.");
    }
  }

  // ===== Erreur : l'offre n'existe pas =====
  if (erreur) {
    return (
      <div className='container mt-5 text-center'>
        <h1 className='rubrique d-inline-block'>Erreur</h1>
        <p className='mt-3'>{erreur}</p>
        <Link to='/' className='btn btn-outline-dark mt-2'>
          ← Retour aux offres
        </Link>
      </div>
    );
  }

  if (!offer) {
    return <p className='container mt-5'>Chargement...</p>;
  }

  // ==================== MODE MODIFICATION ====================
  if (modify) {
    return (
      <div className='container mt-4 mb-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-9'>
            <div className='fiche-offre p-4'>
              <h1 className='auth-titre fs-4 mb-4'>Réformer l'affiche !</h1>

              <form onSubmit={handleSubmitModif}>
                <label className='form-label fw-bold' htmlFor='titre-modif'>
                  Titre
                </label>
                <input
                  id='titre-modif'
                  className='form-control auth-input mb-3'
                  value={titre}
                  placeholder="Titre de l'annonce"
                  required
                  onChange={(e) => setTitre(e.target.value)}
                />

                <label className='form-label fw-bold' htmlFor='description'>
                  Description de l'annonce
                </label>
                <textarea
                  id='description'
                  className='form-control auth-input mb-3'
                  placeholder="Décrivez les missions, l'équipe, etc..."
                  style={{ height: 200 }}
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className='row'>
                  <div className='col-md-4 mb-3'>
                    <label className='form-label fw-bold' htmlFor='entreprise'>
                      Entreprise
                    </label>
                    <input
                      id='entreprise'
                      className='form-control auth-input'
                      value={entreprise}
                      placeholder='Entreprise'
                      required
                      onChange={(e) => setEntreprise(e.target.value)}
                    />
                  </div>
                  <div className='col-md-4 mb-3'>
                    <label className='form-label fw-bold' htmlFor='contrat'>
                      Type de contrat
                    </label>
                    <select
                      id='contrat'
                      className='form-select auth-input'
                      required
                      value={contrat}
                      onChange={(e) => setContrat(e.target.value)}
                    >
                      <option value=''>Choisir ...</option>
                      {TYPE_CONTRAT.map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-md-4 mb-3'>
                    <label className='form-label fw-bold' htmlFor='domaine'>
                      Domaine
                    </label>
                    <select
                      id='domaine'
                      className='form-select auth-input'
                      required
                      value={domaine}
                      onChange={(e) => setDomaine(e.target.value)}
                    >
                      <option value=''>Choisir ...</option>
                      {DOMAINES.map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-md-4 mb-3'>
                    <label className='form-label fw-bold' htmlFor='salaireMin'>
                      Salaire annuel minimum :
                    </label>
                    <input
                      id='salaireMin'
                      type='number'
                      className='form-control auth-input'
                      required
                      value={salaireAnnuelMin}
                      onChange={(e) => setSalaireMin(Number(e.target.value))}
                    />
                  </div>
                  <div className='col-md-4 mb-3'>
                    <label className='form-label fw-bold' htmlFor='salaireMax'>
                      Salaire annuel maximum :
                    </label>
                    <input
                      id='salaireMax'
                      type='number'
                      className='form-control auth-input'
                      required
                      value={salaireAnnuelMax}
                      onChange={(e) => setSalaireMax(Number(e.target.value))}
                    />
                  </div>
                  <div className='col-md-4 mb-3'>
                    <label
                      className='form-label fw-bold'
                      htmlFor='expAnneeMini'
                    >
                      Années d'expérience requises :
                    </label>
                    <input
                      id='expAnneeMini'
                      type='number'
                      className='form-control auth-input'
                      required
                      value={expAnneeMini}
                      onChange={(e) => setMinExp(Number(e.target.value))}
                    />
                  </div>
                  <div className='col-md-12 mb-3'>
                    <label className='form-label fw-bold' htmlFor='ville'>
                      Lieu
                    </label>
                    <input
                      id='ville'
                      type='text'
                      className='form-control auth-input'
                      required
                      value={lieu}
                      onChange={(e) => setLieu(e.target.value)}
                    />
                  </div>
                </div>

                                <div className="d-flex justify-content-center gap-3 mb-4">
    <button type="submit" className="btn-actions-bandeau btn-actions-modif py-2 px-4">
        Valider la modification
    </button>
    <button type="button" onClick={handleAnnuler} className="btn-actions-bandeau py-2 px-4">
        Annuler
    </button>
</div>
                            </form>
                        </div>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MODE AFFICHAGE ====================
  return (
    <>
      <div className='container mt-4 mb-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-9'>
            <div className='fiche-offre p-4'>
              <div className='d-flex gap-3 align-items-start'>
                <img
                  src='https://placehold.co/400x250'
                  alt='image offre'
                  className='rounded fiche-offre-img flex-shrink-0'
                />
                <div>
                  <h1 className='fs-3 mb-1'>{offer.titre}</h1>
                  <p className='mb-2 fst-italic'>
                    {offer.entreprise} - {offer.lieu}
                  </p>
                  <div className='d-flex flex-wrap gap-2'>
                    <span className='badge bg-primary'>{offer.domaine}</span>
                    <span className='badge bg-primary'>{offer.contrat}</span>
                    <span className='badge bg-primary-subtle text-primary'>
                      {offer.salaireAnnuelMin} - {offer.salaireAnnuelMax} € / an
                    </span>
                    <span className='badge bg-primary-subtle text-primary'>
                      Exp : {offer.expAnneeMini} an(s)
                    </span>
                  </div>
                </div>
              </div>

              <p className='mt-3 mb-1'>{offer.description}</p>
              <p className='fst-italic text-secondary mb-0'>
                Publiée le : {offer.datePublication}
              </p>
            </div>

            {message && (
              <p className='auth-message fst-italic mt-3 mx-auto'>{message}</p>
            )}

            <div className='bandeau-actions d-flex justify-content-center gap-3 py-3'>
              {!user && (
                <Link to='/connexion' className='btn-actions-bandeau'>
                  Connecte-toi et rejoins les rangs !
                </Link>
              )}

              {user && !isAdmin && !postule && (
                <button
                  className='btn-actions-bandeau'
                  onClick={handleApplyOffer}
                >
                  Au charbon !
                </button>
              )}

              {user && !isAdmin && postule && (
                <button className='btn-actions-bandeau'>
                  Tu as déjà postulé, bravo!
                </button>
              )}
              {isAdmin && (
                <>
                  <button
                    className='btn-actions-bandeau btn-actions-modif'
                    onClick={handleModifyButton}
                  >
                    Modifier l'offre
                  </button>
                  <button
                    className='btn-actions-bandeau btn-actions-suppr'
                    onClick={() => setModalShow(true)}
                  >
                    Supprimer l'offre
                  </button>
                </>
              )}
            </div>

            <div className='text-center mt-3'>
              <Link to='/' className='btn btn-outline-dark'>
                ← Retour aux offres
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* La modale, nue : react-bootstrap la rend dans le body via un portal */}
      <ModaleSuppression
        show={modalShow}
        handleDelete={handleDelete}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default DetailOffrePage;
