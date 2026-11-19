# AU BOULOT ! — plateforme de recherche d'emploi

Application de consultation d'offres d'emploi classées par domaine
(développement, cybersécurité, réseau...), avec recherche, filtrage,
candidature et gestion des offres par un administrateur.
Projet fil rouge — React, React Router, JSON Server.

**Dépôt :** https://github.com/KARSPA/fil-rouge-ynov
**Présentation du projet (soutenance) :** [lien Canva à compléter]

## Rôles

| Rôle | Droits |
|---|---|
| Visiteur | Consulter la liste et le détail des offres, chercher, filtrer |
| Utilisateur connecté | Consulter et **postuler** aux offres ("Embauche-moi !") |
| Administrateur connecté | CRUD complet sur les offres (créer, modifier, supprimer) |

## Comptes de démonstration (`db.json`)

| Email | Mot de passe | Rôle |
|---|---|---|
| diane@auboulot.fr | ThisisasecurepasswordYNOV2026 | admin |
| ivan@auboulot.fr | user123 | user |
| zahia@auboulot.fr | 1234 | user (a déjà postulé à plusieurs offres : pratique pour tester le badge "✓ Déjà postulé") |

## Prérequis

- Node.js (version 18 ou supérieure)
- npm

## Installation et lancement

```bash
# 1. Cloner le dépôt et installer les dépendances
git clone https://github.com/KARSPA/fil-rouge-ynov.git
cd fil-rouge-ynov
npm install
```

Deux serveurs à lancer, dans **deux terminaux séparés** :

```bash
# Terminal 1 — l'API (JSON Server, port 3000)
npx json-server db.json

# Terminal 2 — l'application (Vite, port 5173)
npm run dev
```

Puis ouvrir : http://localhost:5173

## Tests

```bash
$ npx vitest run --environment jsdom        # une passe, rend la main
```

Deux tests fonctionnels (Vitest + React Testing Library, environnement jsdom) :

- **Affichage d'une carte d'offre** : la carte rend le titre, l'entreprise,
  le lieu, le contrat et la date de publication de l'offre
- **Navigation** : le lien "Voir l'offre" de la carte pointe vers la page
  détail de l'offre (`/offres/:id`)

## Routes

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil : bannière, compteur d'offres, recherche, filtres, grille paginée | Public |
| `/connexion` | Connexion et inscription (même page, deux modes) | Public |
| `/offres/:id` | Détail d'une offre, bandeau d'actions adapté au rôle | Public |
| `/ajout` | Création d'une offre | Admin seulement (redirection vers `/connexion` sinon) |

## Fonctionnalités

- Accueil : grille d'offres en cartes, six par page, pagination,
  **nombre total d'offres affiché**, recherche plein texte (titre, entreprise,
  description), filtrage par domaine
- Fiche détail : badges d'information, bandeau d'actions adapté au rôle
  (visiteur invité à se connecter, utilisateur qui postule, admin qui gère)
- Candidature : "Embauche-moi !" ajoute l'offre au carnet de l'utilisateur,
  badge "✓ Déjà postulé" sur les cartes, double candidature impossible
- Authentification simulée côté React (inscription, connexion, déconnexion),
  état de session partagé (contexte + hook), champs de saisie validés
- CRUD complet réservé à l'admin, avec modales de confirmation
  (suppression, abandon de saisie)
- Protection des routes : `/ajout` inaccessible sans session admin,
  redirection automatique même en accès direct par URL

## Structure du projet

```
fil-rouge-ynov/
├── db.json                  # données : offres + users (API simulée) + comptes de démo
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
│   ├── tests/               # tests Vitest (composants)
│   ├── App.jsx              # déclaration des routes
│   ├── App.css              # la direction artistique
│   └── main.jsx
└── README.md
```

## Stack technique

React · Vite · React Router · Bootstrap 5 · JSON Server · Vitest · React Testing Library
