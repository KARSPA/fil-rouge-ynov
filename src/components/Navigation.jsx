import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * La barre de navigation, présente sur toutes les pages.
 * Elle lit la session dans le contexte partagé (useAuth) et se
 * compose selon l'état : visiteur, travailleur, ou admin.
 *
 * Les trois visages :
 * - Visiteur                  : bouton Connexion
 * - Travailleur connecté      : badge vert + Déconnexion
 * - Admin (en plus du badge)   : lien "Déposer une offre"
 */
export default function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // L'admin est le seul à voir la nav des offres
    const isAdmin = user?.role === "admin";

    /**
     * Déconnexion : vide le contexte et le sessionStorage,
     * puis ramène le visiteur à l'accueil.
     */
    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar au-boulot-nav px-3 gap-2">

            {/* ===== GAUCHE : la marque, puis la nav selon le rôle ===== */}
            <NavLink className="navbar-brand au-boulot-brand" to="/">
                AU BOULOT !
            </NavLink>

            {/* Le dépôt d'offre : réservé à l'admin */}
            {isAdmin && (
                <NavLink to="/ajout" className="btn-nav-bleu">
                    Déposer une offre
                </NavLink>
            )}

            {/* ===== DROITE : tout ce qui touche à la session ===== */}
            <div className="ms-auto d-flex gap-2 align-items-center">

                {/* Visiteur : l'entrée du site */}
                {!user && (
                    <NavLink to="/connexion" className="btn-nav-bleu">
                        Connexion
                    </NavLink>
                )}

                {/* Connecté : badge vert (nom + rôle), Déconnexion à droite */}
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