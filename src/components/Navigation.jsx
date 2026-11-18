import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
    // Simulation de connexion (à remplacer par l'AuthContext plus tard)
    const [user, setUser] = useState(null);
    const fakeAdmin = { nom: "Diane", role: "admin" };
    const fakeUser = { nom: "Kevin", role: "user" };
    const isAdmin = user?.role === "admin";

    return (
        <nav className="navbar au-boulot-nav px-3 gap-2">
            {/* ===== GAUCHE : marque + navigation ===== */}
            <NavLink to="/" className="navbar-brand au-boulot-brand me-3">
                AU BOULOT !
            </NavLink>
            <NavLink to="/" className="nav-link text-white">
                Accueil
            </NavLink>
            {isAdmin && (
                <NavLink to="/ajout" className="btn-nav-bleu">
                    Déposer une annonce
                </NavLink>
            )}

            {/* ===== DROITE : tout ce qui touche à la session ===== */}
            <div className="ms-auto d-flex gap-2 align-items-center">
                {/* Pas connecté : Connexion + les boutons de démo */}
                {!user && (
                    <>
                        <NavLink to="/connexion" className="btn-nav-bleu">
                            Connexion
                        </NavLink>
                        <button className="btn btn-sm btn-outline-light"
                                onClick={() => setUser(fakeUser)}>
                            [démo user]
                        </button>
                        <button className="btn btn-sm btn-outline-light"
                                onClick={() => setUser(fakeAdmin)}>
                            [démo admin]
                        </button>
                    </>
                )}

                {/* Connecté : badge vert + Déconnexion tout à droite */}
                {user && (
                    <>
                        <span className="nav-connected-badge">
                            ● {user.nom} ({user.role})
                        </span>
                        <button className="btn-nav-bleu" onClick={() => setUser(null)}>
                            Déconnexion
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}