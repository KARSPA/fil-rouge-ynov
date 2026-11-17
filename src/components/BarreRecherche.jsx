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
        <form className="input-group mt-4" onSubmit={handleSubmit}>
            <input
                type="search"
                className="form-control"
                placeholder="Métier, entreprise, mot-clé..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button className="btn btn-danger fw-bold" type="submit">
                Fouiller
            </button>
        </form>
    );
}
