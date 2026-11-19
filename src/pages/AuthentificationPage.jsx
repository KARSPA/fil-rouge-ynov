import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getUsers, addUser } from "../services/authService";

/**
 * Authentification : un seul composant, deux modes.
 * Le state `mode` ("connexion" | "inscription") décide du titre,
 * du formulaire et de la phrase de bascule affichés.
 */
export default function AuthentificationPage() {
  const navigate = useNavigate();

  // ===== Session =====
  const { user, login } = useAuth();

  // Le mode affiché : "connexion" au premier passage
  const [mode, setMode] = useState("connexion");

  // ===== Champs du formulaire (partagés par les deux modes) =====
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regExMail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  // Message d'erreur OU de succès, vide quand il n'y a rien à dire
  const [message, setMessage] = useState("");

  // Déjà connecté : la page ne sert à rien, retour à l'accueil
  if (user) {
    return <Navigate to='/' replace />;
  }

  /**
   * Connexion : cherche l'utilisateur par email + mot de passe.
   * Trouvé -> login() le place dans le contexte, retour à l'accueil.
   * Introuvable -> message d'identifiants incorrects.
   */
  async function handleConnexion(e) {
    e.preventDefault();
    setMessage("");
    try {
      const users = await getUsers();
      const userTrouve = users.find(
        (u) => u.email === email && u.password === password,
      );
      if (userTrouve) {
        login(userTrouve);
        navigate("/");
      } else {
        setMessage(
          "Identifiants incorrects. Vérifie ton email et ton mot de passe.",
        );
      }
    } catch (error) {
      setMessage("Erreur serveur : impossible de vérifier tes identifiants.");
    }
  }

  /**
   * Inscription : crée le compte (rôle "user", jamais admin),
   * puis bascule en mode connexion pour l'utiliser immédiatement.
   * Le mot de passe est vidé, le nom et l'email restent pré-remplis.
   */
  async function handleInscription(e) {
    e.preventDefault();
    setMessage("");

    if (!nom.trim() || !email.trim() || !password.trim()) {
      setMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (!regExMail.test(email.trim())) {
      setMessage("Veuillez entrer une adresse mail valide.");
      return;
    }

    try {
      const response =  await addUser({
        nom: nom.trim(),
        email: email.trim(),
        password,
        role: "user",
      });
      if (response.status){
        setMessage("Cette addresse mail est déjà utilisée.")
        return
      }
      
      
      setMode("connexion");
      setMessage("Compte créé ! Connecte-toi avec tes identifiants.");
      setPassword("");
    } catch (error) {
      setMessage("Erreur serveur : impossible de créer le compte.");
    }
  }

  /**
   * Bascule connexion <-> inscription, message effacé au passage.
   */
  function basculerMode() {
    setMessage("");
    setMode(mode === "connexion" ? "inscription" : "connexion");
  }

  return (
    <div className='container mt-5 mb-5'>
      <div className='row justify-content-center'>
        <div className='col-md-7 col-lg-6'>
          <div className='fiche-offre p-4'>
            {/* Le titre : pastille noire centrée, selon le mode */}
            <h1 className='auth-titre mx-auto fs-4 mb-4'>
              {mode === "connexion"
                ? "Connecte-toi travailleur !"
                : "Rejoins les rangs des travailleurs !"}
            </h1>

            {/* Message d'erreur ou de succès */}

            {message && <p className='auth-message fst-italic'>{message}</p>}

            {/* ===== MODE CONNEXION ===== */}
            {mode === "connexion" && (
              <form onSubmit={handleConnexion}>
                <label className='form-label fw-bold' htmlFor='email'>
                  Email
                </label>
                <input
                  id='email'
                  className='form-control auth-input mb-3'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='exemple@auboulot.fr'
                  required
                />
                <label className='form-label fw-bold' htmlFor='password'>
                  Mot de passe
                </label>
                <input
                  id='password'
                  type='password'
                  className='form-control auth-input mb-4'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className='d-grid'>
                  <button type='submit' className='btn-actions-bandeau'>
                    Au charbon !
                  </button>
                </div>
              </form>
            )}

            {/* ===== MODE INSCRIPTION =====
                            Champs dédiés (ids distincts) pour éviter
                            tout partage d'état avec la connexion */}
            {mode === "inscription" && (
              <form onSubmit={handleInscription}>
                <label className='form-label fw-bold' htmlFor='nom'>
                  Nom
                </label>
                <input
                  id='nom'
                  type='text'
                  className='form-control auth-input mb-3'
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
                <label className='form-label fw-bold' htmlFor='email-insc'>
                  Email
                </label>
                <input
                  id='email-insc'
                  className='form-control auth-input mb-3'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='exemple@auboulot.fr'
                  required
                />
                <label className='form-label fw-bold' htmlFor='password-insc'>
                  Mot de passe
                </label>
                <input
                  id='password-insc'
                  type='password'
                  className='form-control auth-input mb-4'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='choisis-en un aussi solide que ta volonté de travailler'
                  required
                />
                <div className='d-grid'>
                  <button type='submit' className='btn-actions-bandeau'>
                    Je m'engage !
                  </button>
                </div>
              </form>
            )}

            {/* La bascule : le "!" vit hors du bouton pour que
                            le texte cliquable reste "ici" / "viens par ici" */}
            <p className='text-center mt-4 mb-0'>
              {mode === "connexion" ? (
                <>
                  Tu n'es pas encore inscrit ? Rectifie ça tout de suite{" "}
                  <button
                    type='button'
                    className='auth-lien'
                    onClick={basculerMode}
                  >
                    ici
                  </button>
                  {" !"}
                </>
              ) : (
                <>
                  Tu es déjà un brave travailleur ?{" "}
                  <button
                    type='button'
                    className='auth-lien'
                    onClick={basculerMode}
                  >
                    viens par ici
                  </button>
                  {" !"}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
