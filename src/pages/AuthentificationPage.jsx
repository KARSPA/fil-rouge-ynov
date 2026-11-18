import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getUsers, addUser } from "../services/authService";

export default function AuthentificationPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { login } = useAuth();


    // Un seul composant, deux modes : "connexion" ou "inscription"
    const [mode, setMode] = useState("connexion");

    // Les champs du formulaire
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Le message affiché (erreur OU succès), vide si rien à dire
    const [message, setMessage] = useState("");

    if (user) {
        return <Navigate to="/" replace />;
    }

    // ===== CONNEXION =====
    async function handleConnexion(e) {
        e.preventDefault();
        setMessage("");
        try {
            const users = await getUsers();
            const userTrouve = users.find(u =>
                u.email === email && u.password === password
            );
            if (userTrouve) {
                login(userTrouve);
                navigate("/");
            } else {
                setMessage("Identifiants incorrects. Vérifie ton email et ton mot de passe.");
            }
        } catch (error) {
            setMessage("Erreur serveur : impossible de vérifier tes identifiants.");
        }
    }

    // ===== INSCRIPTION =====
    async function handleInscription(e) {
        e.preventDefault();
        setMessage("");
        if (!nom.trim() || !email.trim() || !password.trim()) {
            setMessage("Tous les champs sont obligatoires.");
            return;
        }
        addUser({ nom: nom.trim(), email: email.trim(), password, role: "user" })
            .then(() => {
                setMode("connexion");
                setMessage("Compte créé ! Connecte-toi avec tes identifiants.");
                setPassword("");
            })
            .catch(() => setMessage("Erreur serveur : impossible de créer le compte."));
    }

    // La bascule entre les deux modes
    function basculerMode() {
        setMessage("");
        setMode(mode === "connexion" ? "inscription" : "connexion");
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">

                    <div className="fiche-offre p-4">
                        {/* La pastille noire du titre */}
                        <h1 className="auth-titre fs-4 mb-4">
                            {mode === "connexion"
                                ? "Connecte-toi travailleur !"
                                : "Rejoins les rangs des travailleurs !"}
                        </h1>

                        {/* Le message d'erreur ou de succès */}
                        {message && <p className="auth-message fst-italic">{message}</p>}

                        {/* ===== MODE CONNEXION ===== */}
                        {mode === "connexion" && (
                            <form onSubmit={handleConnexion}>
                                <label className="form-label fw-bold" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control auth-input mb-3"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="exemple@auboulot.fr"
                                    required
                                />
                                <label className="form-label fw-bold" htmlFor="password">
                                    Mot de passe
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control auth-input mb-4"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <div className="d-grid">
                                    <button type="submit" className="btn-actions-bandeau">
                                        Au charbon !
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ===== MODE INSCRIPTION ===== */}
                        {mode === "inscription" && (
                            <form onSubmit={handleInscription}>
                                <label className="form-label fw-bold" htmlFor="nom">
                                    Nom
                                </label>
                                <input
                                    id="nom"
                                    type="text"
                                    className="form-control auth-input mb-3"
                                    value={nom}
                                    onChange={e => setNom(e.target.value)}
                                    required
                                />
                                <label className="form-label fw-bold" htmlFor="email-insc">
                                    Email
                                </label>
                                <input
                                    id="email-insc"
                                    type="email"
                                    className="form-control auth-input mb-3"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="exemple@auboulot.fr"
                                    required
                                />
                                <label className="form-label fw-bold" htmlFor="password-insc">
                                    Mot de passe
                                </label>
                                <input
                                    id="password-insc"
                                    type="password"
                                    className="form-control auth-input mb-4"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="choisis-en un aussi solide que ta volonté de travailler"
                                    required
                                />
                                <div className="d-grid">
                                    <button type="submit" className="btn-actions-bandeau">
                                        Je m'engage !
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* La bascule, en bas de la carte */}
                        <p className="text-center mt-4 mb-0">
                            {mode === "connexion" ? (
                                <>T'es pas encore inscrit ? Rectifie ça tout de suite{" "}
                                    <button type="button" className="auth-lien" onClick={basculerMode}>
                                        ici
                                    </button>
                                    !
                                </>
                            ) : (
                                <>Tu es déjà un brave travailleur ?{" "}
                                    <button type="button" className="auth-lien" onClick={basculerMode}>
                                        viens par ici
                                    </button>
                                     !
                                </>
                            )}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}