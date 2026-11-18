import { NavLink, useNavigate } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

export default function Navigation() {
    // LE branchements : la navbar lit le placard commun, plus de simulation locale
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.role === "admin";

    function handleLogout() {
        logout();          // vide le contexte + le sessionStorage
        navigate("/");     // on ramène le visiteur à l'accueil, propre
    }

    return (
        <nav className="navbar au-boulot-nav px-3 gap-2">
            {/* ===== GAUCHE : marque + navigation ===== */}
            <NavLink className="navbar-brand au-boulot-brand" to="/">
                AU BOULOT !
            </NavLink>
            {isAdmin && (
                <NavLink to="/ajout" className="btn-nav-bleu">
                    Déposer une offre
                </NavLink>
            )}

            {/* ===== DROITE : tout ce qui touche à la session ===== */}
            <div className="ms-auto d-flex gap-2 align-items-center">
                {/* Pas connecté : Connexion */}
                {!user && (
                    <NavLink to="/connexion" className="btn-nav-bleu">
                        Connexion
                    </NavLink>
                )}

                {/* Connecté : badge vert + Déconnexion tout à droite */}
                {user && (
                    <>
                        <span className="nav-connected-badge">
                            ● {user.nom} ({user.role})
                        </span>
                        <button className="btn-nav-bleu" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}