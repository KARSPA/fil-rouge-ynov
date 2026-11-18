import {useState} from "react";

export default function BarreRecherche({search, onSearch}) {

    const [formSearch, setFormSearch] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        onSearch(formSearch);
    }
    return (
        <form className="mt-4 barre-recherche" onSubmit={e => handleSubmit(e)}>
            <input
                type="search"
                className="barre-recherche-input"
                placeholder="Métier, entreprise, mot-clé..."
                value={formSearch}
                onChange={(e)=> setFormSearch(e.target.value)}
            />
            <button className="barre-recherche-btn" type="submit">
                Fouiller
            </button>
        </form>
    );
}