# PROJET "AU BOULOT !", une plateforme de recherche d'emploi

Plateforme de consultation d'offres d'emploi, classées par domaine (développement, cybersécurité, réseau, etc.). 
Projet fil rouge RNCP — React, React Router, JSON Server.

## Rôles

| Rôle | Droits |
|---|---|
| Visiteur | Consulter la liste des offres |
| Utilisateur connecté | Consulter le détail des offres, postuler |
| Administrateur | Tout le CRUD sur les offres (pas de candidature) |

## Comptes de démonstration (`db.json`)

| Email | Mot de passe | Rôle |
|---|---|---|
| diane@auboulot.fr | admin123 | admin |
| ivan@auboulot.fr | user123 | user |
| zahia@auboulot.fr | v123 | visitor |

## Prérequis

- Node.js (version 18 ou supérieure)
- npm

## Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-depot>
cd au-boulot

# 2. Installer les dépendances
npm install
```

## Lancement

Deux serveurs à lancer, dans **deux terminaux séparés** :

```bash
# Terminal 1 — l'API (JSON Server, port 3000)
npx json-server --watch db.json --port 3000

# Terminal 2 — l'application (Vite, port 5173)
npm run dev
```

Puis ouvrir : [http://localhost:5173](http://localhost:5173)

## Tests

```bash
npm run test
```

Deux tests fonctionnels (Vitest + React Testing Library) :
- affichage d'une carte d'offre avec ses données
- redirection d'un visiteur non connecté vers la page de connexion (protection de route)

## Structure du projet

```
au-boulot/
├── db.json                  # données : offres + users (API simulée)
├── public/                  # images (bannières, favicon)
├── src/
│   ├── components/          # Navigation, OffreCarte, BarreRecherche...
│   ├── context/             # AuthContext (état de connexion partagé)
│   ├── pages/               # AccueilPage, DetailOffrePage, ConnexionPage,
│   │                        # InscriptionPage, FormulaireOffrePage
│   ├── services/            # appels API séparés des composants
│   ├── App.jsx              # déclaration des routes
│   └── App.css              # direction artistique
└── README.md
```

## Fonctionnalités

- Affichage des offres en cartes, par pages (6 par page)
- Page de détail par offre (accès réservé aux utilisateurs connectés)
- Recherche par titre ou mot-clé, filtrage par domaine
- Authentification simulée côté React : inscription, connexion, déconnexion
- Protection des routes (redirection `/connexion` si non connecté, même en accès direct par URL)
- CRUD complet des offres, réservé à l'administrateur
- Messages de confirmation après chaque opération et redirections
- Validation des champs obligatoires dans les formulaires

## Stack technique

React · Vite · React Router · Bootstrap 5 · JSON Server · Vitest · React Testing Library