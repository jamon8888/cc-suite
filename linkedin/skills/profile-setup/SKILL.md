---
name: profile-setup
description: "This skill should be used during onboarding to gather LinkedIn-specific configuration from the user."
---

# Profile Setup — Configuration LinkedIn

## Interview Flow

### Question 1: Profil LinkedIn
"Quel est ton URL de profil LinkedIn ? (ex: linkedin.com/in/tonnom)"

Store in linkedin-profile.json → profile_url

### Question 2: Pilliers de Contenu
"Sur quels sujets veux-tu publier ? Liste 3-5 pilliers de contenu.
Exemples: 'Growth marketing', 'Leadership', 'IA pour les PME', 'Recrutement tech'"

Store in linkedin-profile.json → content_pillars

### Question 3: Frequence
"Combien de posts par jour veux-tu publier ? (recommande: 1)"

Store in posting_config → posts_per_day

### Question 4: Creneaux
"A quelles heures veux-tu publier ? (recommande: 08:30 et 12:00)
Les meilleurs creneaux LinkedIn en France sont 7h30-9h et 11h30-13h."

Store in posting_config → posting_slots

### Question 5: Jours Actifs
"Quels jours publier ? (recommande: lundi a vendredi)
0=Lundi, 1=Mardi, ..., 6=Dimanche"

Store in posting_config → active_days

### Question 6: Concurrents
"Quels profils LinkedIn veux-tu surveiller ? (0-10 URLs)
Ce sont les personnes dont tu veux analyser le contenu pour t'inspirer."

Store in competitors.json → competitors array with name and profile_url

### Question 7: Timezone
"Quel est ton fuseau horaire ? (defaut: Europe/Paris)"

Store in posting_config → timezone

## Copywriter Integration Check

Before starting the interview:
1. Glob for `copywriter/.claude-plugin/plugin.json` relative to CLAUDE_PLUGIN_ROOT parent
2. If found:
   - Read copywriter/data/voice-dna.json, icp.json, business-profile.json
   - If populated: "Plugin copywriter detecte. J'utilise tes fichiers d'identite existants (voice-dna, ICP, business-profile)."
   - Skip creating local identity files
3. If not found:
   - "Plugin copywriter non detecte. Je vais creer des fichiers d'identite locaux."
   - Run a simplified voice-dna interview (ask for 3 writing samples, extract tone)
   - Run a simplified ICP interview (ask for target audience description)
   - Write to local data/voice-dna.json, data/icp.json, data/business-profile.json

## Chrome Profile Extraction (Optional)

After getting the profile URL:
"Veux-tu que j'ouvre ton profil LinkedIn dans Chrome pour extraire automatiquement ton nom, titre et nombre de followers ?"

If yes:
1. Use chrome-linkedin skill Procedure 1 (auth check)
2. Navigate to profile URL
3. Extract: display_name, headline, follower_count
4. Store in linkedin-profile.json
