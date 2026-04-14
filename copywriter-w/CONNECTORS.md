# Connectors

Le plugin copywriter fonctionne **sans aucun connecteur** (mode standalone). Les connecteurs ajoutent des superpowers optionnels.

## Integration Overview

| Category | Placeholder | Default | Alternatives |
|----------|-------------|---------|--------------|
| **CMS** | `~~CMS` | Markdown output (copier-coller) | WordPress MCP |
| **Recherche** | `~~search` | WebSearch (integre) | Exa (via userConfig) |
| **Social** | `~~social` | Texte formate (copier-coller) | LinkedIn MCP via Zapier |

## Degradation Gracieuse

Si un connecteur n'est **pas** configure, le plugin degrade gracieusement :

- **~~CMS** -> Genere un fichier Markdown pret a copier-coller dans ton CMS
- **~~search** -> Utilise le WebSearch integre de Claude
- **~~social** -> Genere un texte formate pret a coller sur LinkedIn/Twitter

Aucun connecteur n'est requis. Ils rendent le workflow plus rapide et automatique.

## Configuration

### WordPress (~~CMS)

Configure via `userConfig` lors de l'activation du plugin. Le plugin te demande :
- URL du site WordPress
- Nom d'utilisateur
- Mot de passe d'application (genere dans WordPress > Utilisateurs > Mot de passe d'application)

Apres configuration, `/copywriter:ecrire blog` propose automatiquement la publication.

### Exa Search (~~search)

Configure via `userConfig.exa_api_key` lors de l'activation du plugin.
Enrichit `/copywriter:recherche` avec la recherche neurale (plus pertinente que le WebSearch standard).

### LinkedIn (~~social)

Optionnel. Configure via un MCP LinkedIn (Zapier ou autre).
Lance `/copywriter:ecrire social` pour generer du contenu LinkedIn.

## Ordre de Setup Recommande

1. **Aucun connecteur** -> Le plugin fonctionne deja
2. **WordPress** -> Active la publication directe des articles de blog
3. **Exa** -> Ameliore la qualite de la recherche
