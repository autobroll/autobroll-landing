# Autobroll Landing Page

Mini projet React + Vite pour une landing page premium glassmorphism séparée du frontend principal.

## Lancer le projet

```bash
npm install
npm run dev
```

## Où ajouter les vidéos plus tard

Ouvre :

```text
src/data/landingContent.js
```

Tu pourras remplir :

- `videoUrl` pour une carte simple
- `beforeVideoUrl` et `afterVideoUrl` pour une carte avant / après

Exemple :

```js
{
  id: 'captions-01',
  label: 'Captions',
  title: 'Raw Podcast → Premium Captions',
  description: 'Place your before and after links here later.',
  layout: 'compare',
  beforeVideoUrl: 'https://ton-lien-before.mp4',
  afterVideoUrl: 'https://ton-lien-after.mp4',
}
```

## Structure

```text
landingpage/
  src/
    components/
    data/
    styles/
    App.jsx
    LandingPage.jsx
  index.html
  package.json
  vite.config.js
```

## Notes

- Palette principale intégrée :
  - bleu sombre `#0f2139`
  - or / jaune `#f3c766`
- Aucun vert n'est utilisé.
- Les 9 slots vidéo sont déjà prévus.
