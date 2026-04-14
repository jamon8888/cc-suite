# Inbox Naming Convention

Pour que l'inbox processor sache automatiquement dans quel wiki mettre un fichier, utilise le préfixe `topic__` dans le nom du fichier.

## Format

```
<topic>__<titre-du-fichier>.<ext>
```

Le séparateur est **deux underscores** `__`.

## Exemples

| Fichier déposé | → Wiki cible |
|---|---|
| `bitcoin__whitepaper-satoshi.pdf` | `~/wiki/topics/bitcoin/` |
| `macro__fed-minutes-2026.pdf` | `~/wiki/topics/macro/` |
| `ia__anthropic-research.pdf` | `~/wiki/topics/ia/` |
| `notes-sans-prefixe.txt` | auto-détecté par contenu |

## Sans préfixe

Sans préfixe, le processor analyse le contenu du fichier et le compare aux topics existants dans `wikis.json`. S'il ne peut pas trancher, il te demande.

## Sous-dossiers

Tu peux aussi organiser l'inbox en sous-dossiers par topic :

```
~/wiki-inbox/
├── bitcoin/
│   └── whitepaper.pdf
├── macro/
│   └── fed-minutes.pdf
└── notes-vrac.txt
```

Le sous-dossier est prioritaire sur l'analyse de contenu, mais moins prioritaire que le préfixe `__`.
