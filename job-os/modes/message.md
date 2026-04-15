# Mode : message — Prise de contact LinkedIn

Recherche les bons interlocuteurs pour une offre, rédige un message court et percutant, puis l'envoie directement via le profil Chrome de l'utilisateur.

---

## Étape 1 — Identifier les cibles

Via WebSearch, trouver pour l'entreprise cible :

- **Recruteur** — talent acquisition, sourcing, recruiter (priorité si le poste vient d'ouvrir)
- **Hiring manager** — responsable de l'équipe qui recrute (priorité si le poste est ouvert depuis >2 semaines)
- **Pair** — quelqu'un avec un rôle similaire dans l'équipe (pour referral indirect)
- **Intervieweur** — si un entretien est déjà planifié

Sélectionner **une cible principale** : la personne qui bénéficierait le plus de connaître le candidat.

---

## Étape 2 — Rédiger le message

**Contrainte absolue : 300 caractères maximum** (limite LinkedIn pour les demandes de connexion).

Framework 3 phrases adapté à la cible :

### Recruteur
- **Phrase 1 (Fit direct)** : match rôle + expérience + disponibilité/localisation
- **Phrase 2 (Preuve)** : donnée qui répond aux questions de screening avant qu'elles soient posées
- **Phrase 3 (CTA)** : "Je vous envoie mon CV si le profil correspond."

### Hiring Manager
- **Phrase 1 (Accroche)** : défi spécifique de son équipe (tiré du JD, blog, actualités)
- **Phrase 2 (Preuve)** : meilleure réalisation quantifiable en lien avec ce défi
- **Phrase 3 (CTA)** : "Curieux d'entendre comment votre équipe aborde [défi]."

### Pair (referral indirect)
- **Phrase 1 (Intérêt)** : référence genuïne à son travail — article, talk, projet open source
- **Phrase 2 (Connexion)** : ce que le candidat fait dans le même espace (pas un pitch d'emploi)
- **Phrase 3 (CTA)** : "Je travaille sur des problèmes similaires, curieux de votre retour sur [sujet]."
- **Règle** : ne pas mentionner le poste. Le referral vient naturellement si la conversation s'engage.

### Intervieweur (pré-entretien)
- **Phrase 1 (Recherche)** : référence à quelque chose de spécifique dans son parcours
- **Phrase 2 (Contexte)** : lien léger avec l'expérience du candidat
- **Phrase 3 (CTA)** : "À bientôt pour notre échange le [date]."
- **Ton** : léger, pas désespéré. L'objectif est qu'il sache que vous vous êtes préparé.

**Règles d'écriture :**
- Pas de corporate-speak
- Pas de "Je suis passionné par..."
- Pas de liste à puces dans le message
- Langue : français par défaut, anglais si l'interlocuteur est dans un contexte anglophone

---

## Étape 3 — Présenter et valider

Afficher :

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📩 Message rédigé ({N} caractères / 300)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{texte du message}

📍 Cible : {prénom nom} — {titre} chez {entreprise}
🔗 Profil : {url LinkedIn}

Options :
  1. Envoyer maintenant via Chrome
  2. Envoyer une demande de connexion avec cette note
  3. Modifier le message
  4. Copier-coller manuellement
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Étape 4 — Envoi automatique (si option 1 ou 2)

**Option 1 — Message direct** (si déjà connecté avec la cible) :

```bash
node browser.mjs linkedin-message \
  --to "{url-profil}" \
  --text "{message}"
```

**Option 2 — Demande de connexion avec note** :

```bash
node browser.mjs linkedin-connect \
  --to "{url-profil}" \
  --note "{message}"
```

**Avant d'exécuter :**

1. Vérifier que l'utilisateur est connecté à LinkedIn :
```bash
node browser.mjs check-login --platform linkedin
```

2. Si `status: "not-logged-in"` → demander à l'utilisateur de se connecter dans Chrome, puis réessayer.

3. Parser la sortie JSON du script :
   - `status: "sent"` → confirmer l'envoi à l'utilisateur
   - `status: "cancelled"` → ne rien faire
   - `status: "error"` → afficher le message d'erreur + proposer le copier-coller manuel

---

## Étape 5 — Cibles alternatives

Proposer 2 cibles de secours avec justification du choix.

---

## Mode dry-run

Pour tester sans envoyer :

```bash
node browser.mjs linkedin-message --to "{url}" --text "{msg}" --dry-run
```

Affiche le message et la cible sans ouvrir le navigateur.
