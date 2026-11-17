import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar au-boulot-nav px-3">
            <NavLink to="/" className="navbar-brand text-white fw-bold">
                AU BOULOT !
            </NavLink>

            <div className="d-flex gap-2">
                <NavLink to="/" className="nav-link text-white">
                    Accueil
                </NavLink>
                <NavLink to="/connexion" className="nav-link text-white">
                    Connexion
                </NavLink>
                <NavLink to="/ajout" className="nav-link btn-nav-bleu">
                    Déposer une offre
                </NavLink>
            </div>
        </nav>
    );
}