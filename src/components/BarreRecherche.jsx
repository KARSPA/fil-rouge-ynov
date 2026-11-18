import { useState } from "react";

/**
 * La barre de recherche de l'accueil.
 *
 * Le champ vit en local (formSearch) tant que rien n'est envoyé :
 * c'est au submit, et seulement là, que le parent est prévenu via
 * onSearch(). La recherche ne déclenche donc rien à chaque frappe,
 * seulement au clic sur "Fouiller" ou à la touche Entrée.
 */
export default function BarreRecherche({ search, onSearch }) {
    // La saisie locale du champ
    const [formSearch, setFormSearch] = useState("");

    /**
     * L'envoi : on interrompt le rechargement de la page,
     * puis on confie le terme recherché au parent.
     */
    function handleSubmit(e) {
        e.preventDefault();
        onSearch(formSearch);
    }

    return (
        <form className="mt-4 barre-recherche" onSubmit={handleSubmit}>
            <input
                type="search"
                className="barre-recherche-input"
                placeholder="Métier, entreprise, mot-clé..."
                value={formSearch}
                onChange={e => setFormSearch(e.target.value)}
            />
            <button className="barre-recherche-btn" type="submit">
                Fouiller
            </button>
        </form>
    );
}