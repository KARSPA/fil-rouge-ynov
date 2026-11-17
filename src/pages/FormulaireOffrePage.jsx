import {useState} from "react";
import {DEPARTEMENTS, DOMAINES, TYPE_CONTRAT} from "../assets/constantes.js";


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


    const [offreForm, setOffreForm] = useState({...defaultOffreForm});



    function handleSubmit(e) {
        e.preventDefault();

        console.log("form submitted", offreForm);
    }



  return (
    <div className="mt-5 container border rounded shadow-lg p-4">
        <h2 className="fs-2 text-center text-decoration-underline fst-italic">Ajouter votre offre !</h2>

        <form className="row g-3" onSubmit={(e) => {handleSubmit(e)}}>
            <div className="col-12">
                <label htmlFor="titre" className="form-label">Titre</label>
                <input type="text" className="form-control" id="titre" value={offreForm.titre}
                placeholder="Intitulé du poste" />
            </div>
            <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" placeholder="Décrivez les missions, l'équipe, etc ..." style={{height: 200 + "px"}}>
                    {offreForm.description}
                </textarea>
            </div>
            <div className="col-md-4">
                <label htmlFor="entreprise" className="form-label">Entreprise </label>
                <input type="text" className="form-control" id="entreprise"/>
            </div>
            <div className="col-md-4">
                <label htmlFor="entreprise" className="form-label">Type de contrat </label>
                <select id="entreprise" className="form-select">
                        <option value="none">Choisir ...</option>
                    {TYPE_CONTRAT.map((entry) => (
                        <option key={entry} value={entry}>{entry}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="domaine" className="form-label">Domaine</label>
                <select id="domaine" className="form-select">
                        <option value="none">Choisir ...</option>
                    {DOMAINES.map((entry) => (
                        <option key={entry} value={entry}>{entry}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="salaireMin" className="form-label">Salaire annuel minimum :</label>
                <input type="text" className="form-control" id="salaireMin"/>
            </div>
            <div className="col-md-4">
                <label htmlFor="salaireMax" className="form-label">Salaire annuel maximum :</label>
                <input type="text" className="form-control" id="salaireMax"/>
            </div>
            <div className="col-md-4">
                <label htmlFor="expAnneeMini" className="form-label">Années d'expériences requises :</label>
                <input type="text" className="form-control" id="expAnneeMini"/>
            </div>
            <div className="col-md-8">
                <label htmlFor="ville" className="form-label">Ville</label>
                <input type="text" className="form-control" id="ville"/>
            </div>
            <div className="col-md-4">
                <label htmlFor="departement" className="form-label">Département</label>
                <select id="departement" className="form-select">
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
