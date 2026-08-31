# todo-list
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

# Application Todo List — React, TypeScript & shadcn/ui

Ce projet est une application web moderne de gestion de tâches (Todo List) conçue à l'aide de **React**, **TypeScript**, **Tailwind CSS** et des composants d'interface de **shadcn/ui**. Les données sont persistées localement dans le navigateur de l'utilisateur.

---

# Architecture Globale & Responsabilités

L'application suit une architecture découplée où le composant racine `App.tsx` centralise la logique (source unique de vérité) et distribue les données et les actions de manière descendante aux composants enfants spécialisés.

# Modèle de Données (`src/types/`)

# `task.ts`
Définit le contrat structurel de l'entité Tâche à l'aide d'une interface TypeScript stricte.
* `id` (`string`) : Identifiant unique généré pour cibler précisément une tâche lors de modifications ou de suppressions.
* `title` (`string`) : Libellé textuel décrivant la tâche à accomplir.
* `completed` (`boolean`) : Indicateur binaire de statut (`true` pour une tâche terminée, `false` pour une tâche à faire).
* `createdAt` (`string`) : Horodatage stocké au format universel et sérialisable ISO pour assurer un historique fiable.

---

# Gestion des Données et Outils (`src/lib/`)

# `storage.ts`
Fournit une API utilitaire isolée pour interagir avec le disque dur du navigateur (`localStorage`) de façon sécurisée.
* `loadTasks()` : Tente de récupérer et de parser la chaîne de caractères JSON stockée sous la clé du projet pour reconstruire le tableau initial. Renvoie un tableau vide `[]` en cas d'absence de données ou de corruption.
* `saveTasks()` : Convertit et écrase de manière asynchrone le tableau de tâches actuel en texte JSON dans la mémoire du navigateur dès qu'une action utilisateur survient.

---

# omposants d'Interface Graphique (`src/components/`)

# `task-form.tsx` (Zone d'Ajout)
Composant autonome chargé de capturer les nouvelles saisies utilisateur.
* Logique métier : Utilise un état local réactif pour suivre l'écriture lettre par lettre. À la soumission, la méthode `.trim()` nettoie les espaces superflus. Si le champ est vide, l'exécution s'interrompt pour interdire la création de lignes invalides.

# `task-summary.tsx` (Compteurs globaux)
Composant d'affichage purement fonctionnel et passif.
* Règle architecturale : Reçoit ses valeurs numériques (`total`, `active`, `completed`) directement par ses propriétés (*props*). Il ne possède aucun état interne (`useState`), ce qui garantit qu'il reste synchronisé sans introduire d'incohérence de données.

# `task-filters.tsx` (Barre de Recherche et d'Onglets)
Permet à l'utilisateur de spécifier ses préférences visuelles d'affichage à l'écran.
* Logique métier : Combine un champ textuel adaptatif et un sélecteur d'onglets à états stricts (`all`, `active`, `completed`). Il transmet instantanément les valeurs saisies au composant parent pour mettre à jour l'affichage en temps réel.

# `task-item.tsx` (Ligne Unitaire d'une Tâche)
C'est le composant le plus interactif de l'interface. Il encapsule la case à cocher, l'affichage des badges de statut, la mise en forme conditionnelle (barrement du texte) et deux structures de dialogues avancées de `shadcn/ui` :
* `Dialog` (Modification) : Ouvre un espace de modification de titre éphémère contrôlé localement. Il vérifie la validité du nouveau titre avant d'appeler la sauvegarde.
* `AlertDialog` (Suppression)** : Intercepte le clic de destruction pour afficher une fenêtre de confirmation obligatoire afin de prévenir les clics accidentels de l'utilisateur.

# `task-list.tsx` (Conteneur de Collection)
Gère l'affichage séquentiel de l'interface en appliquant un rendu conditionnel précis.
* Rendu conditionnel : Si la collection reçue est vide, le composant court-circuite sa boucle habituelle pour afficher un encadré textuel en pointillés ("Aucune tâche à afficher.").
* Itération native : Utilise la méthode native `.map()` pour instancier un composant `<TaskItem />` par entrée présente dans le tableau. Chaque ligne reçoit une propriété `key` immuable et stable basée sur l'identifiant unique de la tâche pour optimiser les performances de rafraîchissement du DOM virtuel de React.

---

# Composant Maître de l'Application (`src/App.tsx`)

Le fichier `App.tsx` agit comme le chef d'orchestre global du logiciel. C'est à cet endroit que s'articulent tous les flux de données.

* Gestion des États Généraux : Initialise la mémoire vive de l'application via `storage.loadTasks()` et maintient à jour les critères de recherche courants.
* **Synchronisation Réactive (`useEffect`)** : Déclenche automatiquement l'écriture dans le support de stockage physique du navigateur à chaque fois que la collection de tâches subit une modification structurelle (ajout, basculement, édition ou suppression).
* Immuabilité des Fonctions Métiers :
  * Ajout : Instancie une tâche en générant un identifiant universel (`crypto.randomUUID()`) et l'ajoute en tête de liste à l'aide de l'opérateur de décomposition (`[newTask, ...prev]`).
  * Modification et Inversion : Parcourt et reconstruit proprement le tableau en créant des copies d'objets modifiés afin de respecter les principes d'immuabilité imposés par React.
  * Suppression : Extrait un élément en utilisant la fonction native `.filter()`.
* Valeurs Dérivées Performantes : Calcule dynamiquement le nombre d'éléments totaux, complétés et actifs à chaque cycle de rendu. Le filtrage croisé (recherche de texte insensible à la casse et onglet actif) s'effectue à la volée, évitant la multiplication inutile d'états réactifs complexes et de bugs de désynchronisation.
