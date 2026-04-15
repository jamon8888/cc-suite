# Mode : apply — Assistant de candidature

Assiste la soumission d'une candidature : lit le formulaire en ligne, charge le contexte du rapport d'évaluation existant, génère les réponses personnalisées, puis remplit et soumet le formulaire via le profil Chrome.

---

## Étape 1 — Détecter l'offre

**Avec Playwright :** snapshot de la page active → extraire titre, URL, contenu visible.

**Sans Playwright :** demander à l'utilisateur de :
- Partager un screenshot du formulaire
- Coller les questions manuellement
- Indiquer entreprise + rôle pour recherche manuelle

---

## Étape 2 — Charger le contexte

1. Extraire nom de l'entreprise et titre du rôle
2. Chercher dans `reports/` (Grep insensible à la casse sur le nom de l'entreprise)
3. Si match → charger le rapport complet
4. Si Section G présente → utiliser les réponses draft comme base
5. Si pas de match → proposer de lancer l'auto-pipeline d'abord

---

## Étape 3 — Vérifier le rôle

Si le rôle à l'écran diffère de celui évalué :
- Signaler : "Le rôle a changé de [X] à [Y]. Adapter les réponses ou ré-évaluer ?"
- **Adapter** : ajuster sans ré-évaluer
- **Ré-évaluer** : lancer l'évaluation A-F, mettre à jour le rapport, régénérer la Section G
- Mettre à jour le titre dans `applications.md` si nécessaire

---

## Étape 4 — Analyser le formulaire

Identifier TOUTES les questions visibles :
- Champs texte libre (lettre de motivation, "pourquoi ce rôle", etc.)
- Dropdowns (source, autorisation de travail, etc.)
- Oui/Non (relocalisation, visa, etc.)
- Champs salaire
- Uploads (CV, lettre de motivation PDF)

Classifier chaque question :
- **Déjà en Section G** → adapter la réponse existante
- **Nouvelle question** → générer depuis le rapport + `cv-{track}.md`

---

## Étape 5 — Générer les réponses

Pour chaque question :

1. **Blocs B et F du rapport** : proof points, stories STAR+R
2. **Section G existante** : base à raffiner si disponible
3. **Ton "je vous choisis"** : spécificité sur le JD, pas générique
4. **Sélecteur CSS** : identifier le sélecteur HTML du champ pour l'automatisation

Format de sortie :

```
## Réponses — {Entreprise} / {Rôle}
Rapport : #{NNN} | Score : {X.X}/5 | Track : {track}

---

### 1. {Question exacte du formulaire}
Sélecteur : {selector CSS ou xpath}
> {Réponse prête à copier-coller}

### 2. {Question suivante}
Sélecteur : {selector}
> {Réponse}

---

Notes :
- {Observations sur le rôle, ajustements suggérés}
```

---

## Étape 6 — Remplissage automatique

Construire le JSON de champs à partir des sélecteurs identifiés :

```bash
node browser.mjs apply \
  --url "{url-formulaire}" \
  --fields '{
    "#cover-letter": "Votre lettre de motivation...",
    "#why-us": "Ce qui m attire chez vous...",
    "select[name=heard]": "LinkedIn"
  }'
```

**Avant d'exécuter :**

1. Vérifier la connexion à la plateforme :
```bash
node browser.mjs check-login --platform linkedin
# ou : indeed | wttj | apec
```

2. Si non connecté → demander à l'utilisateur de se connecter dans Chrome.

3. Parser la sortie JSON :
   - `status: "sent"` → candidature soumise, passer à l'étape 7
   - `status: "manual"` → formulaire rempli, soumission manuelle par l'utilisateur
   - `status: "cancelled"` → ne rien faire
   - `status: "error"` → afficher l'erreur + proposer le copier-coller manuel

**Note sur les uploads PDF :** le script ne gère pas encore les uploads de fichiers. Si le formulaire demande un PDF, indiquer à l'utilisateur d'uploader manuellement `output/{num}-{slug}.pdf` une fois le navigateur ouvert.

---

## Étape 7 — Post-soumission

Une fois la candidature envoyée (automatique ou manuelle) :

1. Mettre à jour `applications.md` : statut `Évalué` → `Candidaté`
2. Enregistrer les réponses finales en Section G du rapport
3. Proposer `/job-os message` pour envoyer un message au recruteur ou hiring manager

---

## Mode dry-run

Pour prévisualiser sans ouvrir le navigateur :

```bash
node browser.mjs apply --url "{url}" --fields '{...}' --dry-run
```
