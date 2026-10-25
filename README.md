# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# Météo

Application web qui affiche la météo de n'importe quel lieu de la planète, avec un fond animé qui s'adapte au temps qu'il fait sur place.

## Fonctionnalités

- Météo du moment : température, temps, humidité, vent
- Prévisions heure par heure (24 prochaines heures) et sur 7 jours
- Recherche de n'importe quelle ville dans le monde
- Géolocalisation du visiteur (avec son accord), avec un lieu de secours si elle est refusée
- Fond animé selon le temps : soleil, nuages, pluie, neige, orage, avec une version de jour et une version de nuit
- Animations désactivées pour les personnes qui ont demandé de réduire les mouvements (`prefers-reduced-motion`)

## Technologies

- React et Vite
- CSS pur (variables, grilles, animations)
- Open-Meteo pour la météo et la recherche de villes
- BigDataCloud pour retrouver le nom d'une ville à partir de la position du visiteur

## Installation

Prérequis : Node.js.

```
git clone <adresse-du-depot>
cd meteoapp
npm install
npm run dev
```

Pour produire la version finale : `npm run build`.

## Architecture

Le code est découpé en couches, chacune avec un seul rôle.

```
src/
├── main.jsx            point d'entrée
├── App.jsx             appelle uniquement HomePage
├── config/             adresses des API et réglages
├── services/           appels aux API (villes, météo, nom de lieu)
├── hooks/              état et logique (recherche, météo, géolocalisation)
├── utils/              petites fonctions sans état (formatage, codes météo, thèmes)
├── pages/              HomePage assemble les composants
├── components/         briques d'affichage (barre de recherche, prévisions, fond animé...)
└── styles/             un fichier CSS par composant, plus global.css
```

Principes suivis :

- `App.jsx` ne contient aucune logique : il appelle uniquement la page d'accueil
- les composants affichent ce qu'on leur donne, ils ne vont jamais chercher de données eux-mêmes
- une seule source de vérité pour chaque règle (par exemple, un code météo devient une catégorie à un seul endroit, et l'icône comme le fond s'en servent)

## Sources de données

- Données météo et recherche de villes : [Open-Meteo.com](https://open-meteo.com/)
- Nom du lieu pour la position du visiteur : [BigDataCloud](https://www.bigdatacloud.com/), qui reçoit les coordonnées du visiteur uniquement après son accord

## Pistes d'amélioration

- Carte cliquable pour choisir un point du globe
- Choix des unités (°C et °F)
- Villes favorites