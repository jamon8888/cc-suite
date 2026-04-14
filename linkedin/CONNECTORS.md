# Connectors

Le plugin linkedin fonctionne **sans aucun connecteur** (mode standalone).
Toutes les interactions LinkedIn passent par Claude in Chrome.

## Integration Overview

| Category | Methode | Requis |
|----------|---------|--------|
| **LinkedIn** | Claude in Chrome (browser) | Session LinkedIn active dans Chrome |
| **Recherche** | WebSearch (integre) | Aucun |
| **Identite** | Copywriter plugin (optionnel) | Plugin copywriter installe |

## Degradation Gracieuse

- **Copywriter non installe** → Le plugin cree ses propres fichiers voice-dna, icp, business-profile via /linkedin:start
- **Chrome non connecte** → Les fonctions de generation, scoring, et strategie fonctionnent. Seules les actions LinkedIn (poster, scraper, commenter) necessitent Chrome.
- **Pas de donnees analytics** → Le plugin utilise des best-practices par defaut. L'apprentissage s'ameliore avec le temps.

## Prerequis

1. **Claude in Chrome** installe et connecte
2. **Session LinkedIn** active dans le navigateur Chrome
3. **(Optionnel)** Plugin copywriter installe pour partager voice-dna/icp/business-profile
