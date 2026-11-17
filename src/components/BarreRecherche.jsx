import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BarreRecherche() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(search)}`);
    }

    return (
        <form className="mt-4 barre-recherche" onSubmit={handleSubmit}>
            <input
                type="search"
                className="barre-recherche-input"
                placeholder="Métier, entreprise, mot-clé..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button className="barre-recherche-btn" type="submit">
                Fouiller
            </button>
        </form>
    );
}