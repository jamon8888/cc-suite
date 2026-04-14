# Connectors

Le plugin sales fonctionne **sans aucun connecteur** (mode standalone). Les connecteurs ajoutent des superpowers optionnels.

## Integration Overview

| Categorie | Placeholder | Default | Options MCP |
|-----------|-------------|---------|-------------|
| **CRM** | `~~CRM` | Notes manuelles | HubSpot, Close |
| **Enrichissement** | `~~enrichment` | WebSearch | Clay, ZoomInfo |
| **Communication** | `~~comms` | Manuel | Slack, MS365 |
| **Transcription** | `~~transcription` | Notes manuelles | Fireflies |
| **Connaissances** | `~~knowledge` | Wiki uniquement | Notion, Atlassian |

## Degradation Gracieuse

Si un connecteur n'est **pas** configure :

- **~~CRM** -> Pas de donnees pipeline automatiques. Saisie manuelle.
- **~~enrichment** -> WebSearch pour la recherche de prospects.
- **~~comms** -> Pas de scan Slack/email automatique.
- **~~transcription** -> Notes d'appel manuelles.
- **~~knowledge** -> Le wiki est la source principale. Notion/Atlassian optionnels.

Aucun connecteur n'est requis. Ils enrichissent le workflow automatiquement.

## Usage par Commande

| Commande | MCP utilises |
|----------|-------------|
| prospecter | Clay, ZoomInfo (enrichissement) |
| preparer | HubSpot/Close (deals), Fireflies (transcriptions), Slack (threads) |
| pipeline | HubSpot/Close (donnees pipeline) |
| prevoir | HubSpot/Close (forecast) |
| linkedin | Notion (idees contenu) |
| analyser | HubSpot/Close (historique deal) |
| creer | MS365 (templates), Atlassian (specs) |
| coacher | Fireflies (enregistrements appels) |

## Ordre de Setup Recommande

1. **Aucun connecteur** -> Le plugin fonctionne deja
2. **HubSpot ou Close** -> Active les donnees pipeline automatiques
3. **Slack** -> Detecte les signaux dans les conversations
4. **Fireflies** -> Enrichit les prep calls avec les transcriptions
5. **Clay/ZoomInfo** -> Enrichissement prospects automatique
6. **Notion/Atlassian** -> Sources de connaissances supplementaires

## Authentification

Tous les serveurs MCP sont de type HTTP. Authentification via Cowork OAuth : lance `/mcp` dans Cowork pour connecter chaque service.
