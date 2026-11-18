# PROJET "AU BOULOT !", une plateforme de recherche d'emploi

Plateforme de consultation d'offres d'emploi, classées par domaine
(développement, cybersécurité, réseau, etc.).
Projet fil rouge — React, React Router, JSON Server.

## Rôles

| Rôle | Droits |
|---|---|
| Visiteur | Consulter la liste et le détail des offres, chercher, filtrer |
| Utilisateur connecté | Consulter et **postuler** aux offres ("Embauche-moi !") |
| Administrateur connecté | CRUD complet sur les offres (créer, modifier, supprimer) |

## Comptes de démonstration (`db.json`)

| Email | Mot de passe | Rôle |
|---|---|---|
| diane@auboulot.fr | admin123 | admin |
| Yvan@auboulot.fr | user123 | user |
| zahia@auboulot.fr | 1234 | user (a déjà postulé à plusieurs offres : pratique pour tester le badge "✓ Déjà postulé") |

## Prérequis

- Node.js (version 18 ou supérieure)
- npm

## Installation et lancement

```bash
# 1. Cloner le dépôt
git clone <url-du-depot>
cd au-boulot

# 2. Installer les dépendances
npm install
```

Deux serveurs à lancer, dans **deux terminaux séparés** :

```bash
# Terminal 1 — l'API (JSON Server, port 3000)
npx json-server --watch db.json --port 3000

# Terminal 2 — l'application (Vite, port 5173)
npm run dev
```

Puis ouvrir : http://localhost:5173

## Routes

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil : bannière, recherche, filtres, grille paginée | Public |
| `/connexion` | Authentification (connexion ET inscription, même page) | Public |
| `/offres/:id` | Détail d'une offre, bandeau adapté au rôle | Public |
| `/ajout` | Dépôt d'une offre | Admin seulement (redirection sinon) |

## Tests

```bash
npx vitest
```

Deux tests fonctionnels (Vitest + React Testing Library) :

- affichage d'une carte d'offre avec ses données
- protection de route : un visiteur non connecté qui force l'URL `/ajout`
  est redirigé vers la page de connexion

## Structure du projet

```
au-boulot/
├── db.json                  # données : offres + users (API simulée)
├── public/                  # images (bannière, favicon)
├── src/
│   ├── assets/              # constantes.js : domaines, contrats, départements
│   ├── components/          # Navigation, OffreCarte, BarreRecherche,
│   │                        # ModaleSuppression, ModaleAnnulation
│   ├── context/             # AuthContext : état de connexion partagé
│   ├── hooks/               # useAuth : accès à la session partout
│   ├── pages/               # AccueilPage, DetailOffrePage,
│   │                        # AuthentificationPage (connexion + inscription),
│   │                        # FormulaireOffrePage
│   ├── services/            # offresService, authService (appels API)
│   ├── App.jsx              # déclaration des routes
│   ├── App.css              # la direction artistique
│   └── main.jsx
└── README.md
```

## Fonctionnalités

- Affichage des offres en cartes, six par page, pagination
- Détail par offre : badges d'information, bandeau d'actions adapté au rôle
  (visiteur invité à se connecter, utilisateur qui postule, admin qui gère)
- Recherche plein texte (titre, entreprise, description), filtrage par domaine
- Inscription, connexion, déconnexion : authentification simulée côté React,
  état de connexion centralisé (contexte + hook dédié)
- Candidature : "Embauche-moi !" ajoute l'offre au carnet de l'utilisateur,
  badge "✓ Déjà postulé" sur les cartes et bouton désactivé sur la fiche
- CRUD complet réservé à l'admin, avec modales de confirmation
  (suppression, abandon de saisie)
- Messages de confirmation ou d'erreur après chaque opération, redirections
- Validation des champs obligatoires dans les formulaires

## Stack technique

React · Vite · React Router · Bootstrap 5 · JSON Server · Vitest · React Testing Library
