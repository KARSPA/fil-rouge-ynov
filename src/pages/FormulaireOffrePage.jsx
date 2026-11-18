import {useState} from "react";
import {DEPARTEMENTS, DOMAINES, TYPE_CONTRAT} from "../assets/constantes.js";
import {addOffer} from "../services/offresService.js";
import {useNavigate} from "react-router-dom";


const defaultOffreForm = {
    titre : "",
    description : "",
    entreprise : "",
    contrat : "",
    domaine : "",
    lieu : "",
    ville : "",
    departementCP : "",
    salaireAnnuelMin : 0,
    salaireAnnuelMax : 100000,
    expAnneeMini : 0,
    datePublication : ""
}



function FormulaireOffrePage() {


    const navigate = useNavigate();

    const [offreForm, setOffreForm] = useState({...defaultOffreForm});



    function handleSubmit(e) {
        e.preventDefault();

        const today = new Date(Date.now());
        const offre = {
            titre : offreForm.titre,
            description : offreForm.description,
            entreprise : offreForm.entreprise,
            contrat : offreForm.contrat,
            domaine : offreForm.domaine,
            lieu : `${offreForm.ville} - ${offreForm.departementCP}`,
            salaireAnnuelMin : offreForm.salaireAnnuelMin,
            salaireAnnuelMax : offreForm.salaireAnnuelMax,
            expAnneeMini : offreForm.expAnneeMini,
            datePublication : `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
        }

        addOffer(offre)
            .then(() => alert("Offre ajoutée avec succès !"))
            .then(() => navigate('/'))
            .catch((err) => console.log(err));

    }



  return (
    <div className="mt-5 container border rounded shadow-lg p-4 ">
        <h2 className="fs-2 text-center text-decoration-underline fst-italic">Ajouter une offre</h2>

        <form className="row g-3" onSubmit={(e) => {handleSubmit(e)}}>
            <div className="col-12">
                <label htmlFor="titre" className="form-label">Titre</label>
                <input type="text" className="form-control" id="titre" value={offreForm.titre}
                placeholder="Intitulé du poste" onChange={(e) => {setOffreForm({...offreForm, titre:e.target.value})}}/>
            </div>
            <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" placeholder="Décrivez les missions, l'équipe, etc ..." style={{height: 200 + "px"}}
                          value={offreForm.description}
                          onChange={(e) => {setOffreForm({...offreForm, description:e.target.value})}}>
                </textarea>
            </div>
            <div className="col-md-4">
                <label htmlFor="entreprise" className="form-label">Entreprise </label>
                <input type="text" className="form-control" id="entreprise" onChange={(e) => {setOffreForm({...offreForm, entreprise:e.target.value})}}/>
            </div>
            <div className="col-md-4">
                <label htmlFor="contrat" className="form-label">Type de contrat </label>
                <select id="contrat" className="form-select" onChange={(e) => {setOffreForm({...offreForm, contrat:e.target.value})}}>
                        <option value="">Choisir ...</option>
                    {TYPE_CONTRAT.map((entry) => (
                        <option key={entry} value={entry}>{entry}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="domaine" className="form-label">Domaine</label>
                <select id="domaine" className="form-select" onChange={(e) => {setOffreForm({...offreForm, domaine:e.target.value})}}>
                        <option value="">Choisir ...</option>
                    {DOMAINES.map((entry) => (
                        <option key={entry} value={entry}>{entry}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="salaireMin" className="form-label">Salaire annuel minimum :</label>
                <input type="number" className="form-control" id="salaireMin" onChange={(e) => {setOffreForm({...offreForm, salaireAnnuelMin:Number(e.target.value)})}}/>
            </div>
            <div className="col-md-4">
                <label htmlFor="salaireMax" className="form-label">Salaire annuel maximum :</label>
                <input type="number" className="form-control" id="salaireMax" onChange={(e) => {setOffreForm({...offreForm, salaireAnnuelMax:Number(e.target.value)})}}/>
            </div>
            <div className="col-md-4">
                <label htmlFor="expAnneeMini" className="form-label">Années d'expériences requises :</label>
                <input type="number" className="form-control" id="expAnneeMini" onChange={(e) => {setOffreForm({...offreForm, expAnneeMini:Number(e.target.value)})}}/>
            </div>
            <div className="col-md-8">
                <label htmlFor="ville" className="form-label">Ville</label>
                <input type="text" className="form-control" id="ville" onChange={(e) => {setOffreForm({...offreForm, ville:e.target.value})}}/>
            </div>
            <div className="col-md-4">
                <label htmlFor="departement" className="form-label">Département</label>
                <select id="departement" className="form-select" onChange={(e) => {setOffreForm({...offreForm, departementCP:e.target.value})}}>
                    <option selected>Choisir ...</option>
                    {DEPARTEMENTS.map((entry) => (
                        <option key={entry.CP} value={entry.CP}>{entry.CP} - {entry.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center mb-4">
                <button type="submit" className="btn btn-primary">Créer l'offre</button>
            </div>
        </form>

    </div>
  );
}

export default FormulaireOffrePage;
