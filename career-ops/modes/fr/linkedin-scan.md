# Mode : LinkedIn Scan (Navigateur)

> **Prérequis :** Session LinkedIn active dans Chrome (vous devez être connecté).
> Ce mode utilise `browser_navigate` + `browser_snapshot` pour extraire les offres directement depuis LinkedIn sans API ni token.

---

## Étape 0 — Préparation

Lire `config/profile.yml → target_positions` pour connaître les titres à rechercher.
Lire `config/profile.yml → market.preferred_cities` pour le filtre de localisation.

Construire une URL de recherche par position :

```
https://www.linkedin.com/jobs/search/?keywords={TITRE_ENCODÉ}&location={LIEU_ENCODÉ}&f_TPR=r604800&f_E=4,5,6&f_WT=2
```

Paramètres :
- `f_TPR=r604800` — 7 derniers jours uniquement
- `f_E=4,5,6` — séniorité Director / VP / C-Suite
- `f_WT=2` — Remote (retirer si on veut tous les types de contrat)

Titres par défaut (adapter selon `target_positions`) :
- `CTO` ou `Directeur+Technique`
- `Head+of+AI` ou `Directeur+IA` ou `Responsable+IA`
- `VP+Engineering` ou `Director+of+Engineering`

---

## Étape 1 — Navigation et capture

Pour chaque requête construite :

1. `browser_navigate` vers l'URL de recherche
2. Attendre 3 secondes (LinkedIn est une SPA — le contenu se charge après hydratation)
3. `browser_snapshot` pour capturer la liste des offres visibles
4. Si LinkedIn affiche une page de vérification ou un CAPTCHA :
   > Demander à l'utilisateur : "LinkedIn demande une vérification. Pouvez-vous la compléter manuellement dans Chrome, puis me dire quand c'est bon ?"
   > Relancer `browser_snapshot` après confirmation.

---

## Étape 2 — Extraction des offres

Depuis chaque snapshot, extraire pour chaque offre visible :

| Champ | Sélecteur typique | Notes |
|-------|------------------|-------|
| Titre | `.job-card-list__title` ou `h3` | Obligatoire |
| Entreprise | `.job-card-container__company-name` | Obligatoire |
| Localisation | `.job-card-container__metadata-item` | Optionnel |
| URL | `href` du lien sur le titre | Format : `linkedin.com/jobs/view/{id}/` |
| Date | `.job-card-container__listed-status` | "Il y a 2 jours", etc. |

Pour paginer (si plus de 25 résultats), naviguer vers l'URL avec `&start=25`, `&start=50`, etc. S'arrêter à 75 résultats max par requête (LinkedIn limite à 100).

---

## Étape 3 — Déduplication

Avant d'ajouter au pipeline :

1. Lire `data/scan-history.tsv` — extraire les URLs déjà vues
2. Lire `data/pipeline.md` — extraire les URLs déjà en attente
3. Lire `data/applications.md` — extraire les URLs déjà traitées
4. Appliquer le filtre de titres de `portals.yml → title_filter` :
   - Au moins 1 mot-clé `positive` dans le titre (case-insensitive)
   - Aucun mot-clé `negative`

---

## Étape 4 — Ajout au pipeline

Pour chaque nouvelle offre non-dupliquée :

```markdown
- [ ] {URL_LINKEDIN} | {Entreprise} | {Titre}
  > Source: LinkedIn | Scanné: {DATE} | Fit position: {meilleure_position}
```

Ajouter sous la section `## En attente` (ou `## Pendientes`) dans `data/pipeline.md`.
Créer le fichier s'il n'existe pas encore :

```markdown
# Pipeline

## En attente

## Traités
```

Mettre à jour `data/scan-history.tsv` avec les nouvelles URLs :
```
{url}\t{date}\tlinkedin-browser\t{titre}\t{entreprise}\tadded
```

---

## Étape 5 — Rapport de scan

Afficher un résumé une fois le scan terminé :

```
## Résultats LinkedIn Scan — {DATE}

| Position recherchée | Offres trouvées | Nouvelles | Dupliquées |
|---------------------|----------------|-----------|------------|
| CTO / Directeur Technique | X | X | X |
| Head of AI / Directeur IA | X | X | X |
| VP Engineering | X | X | X |

**Total nouvelles offres ajoutées au pipeline : {N}**

→ Lancer `/career-ops pipeline` pour évaluer toutes les offres en attente.
→ Ou coller une URL directement pour une évaluation individuelle.
```

---

## Notes importantes

- **Fréquence :** Ne pas scanner LinkedIn plus de 2 fois par jour pour éviter les restrictions de compte.
- **URLs LinkedIn :** Elles expirent après ~90 jours. `check-liveness.mjs` les marquera comme `uncertain` — vérifier manuellement si une offre semble fermée.
- **Easy Apply vs. offre externe :** Les offres LinkedIn "Easy Apply" soumettent directement sur LinkedIn. Les offres externes redirigent vers le site de l'entreprise. Préférer les offres externes pour une meilleure personnalisation.
- **Confidentialité :** Ce mode lit uniquement les pages publiques de recherche LinkedIn. Aucune donnée n'est envoyée hors de votre session locale.
