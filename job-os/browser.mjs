#!/usr/bin/env node
/**
 * browser.mjs — Automatisation navigateur pour job-os
 *
 * Utilise le profil Chrome réel de l'utilisateur (sessions existantes incluses).
 * Confirmation obligatoire avant chaque action destructive.
 *
 * Usage :
 *   node browser.mjs linkedin-message --to <url-profil> --text "message" [--dry-run]
 *   node browser.mjs linkedin-connect  --to <url-profil> --note "note" [--dry-run]
 *   node browser.mjs apply             --url <url-formulaire> --fields '{"field":"value"}' [--dry-run]
 *   node browser.mjs check-login       --platform linkedin|indeed|wttj
 *
 * Sortie JSON :
 *   { "status": "sent"|"dry-run"|"cancelled"|"error", "message": "..." }
 */

import { chromium } from 'playwright'
import os from 'os'
import path from 'path'
import fs from 'fs'
import readline from 'readline'

// ─── Détection du profil Chrome ──────────────────────────────────────────────

function findChromeProfile() {
  const home = os.homedir()
  const platform = os.platform()

  const candidates = platform === 'win32'
    ? [
        path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'User Data'),
        path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome Beta', 'User Data'),
      ]
    : platform === 'darwin'
    ? [
        path.join(home, 'Library', 'Application Support', 'Google', 'Chrome'),
        path.join(home, 'Library', 'Application Support', 'Google', 'Chrome Beta'),
        path.join(home, 'Library', 'Application Support', 'Chromium'),
      ]
    : [
        path.join(home, '.config', 'google-chrome'),
        path.join(home, '.config', 'chromium'),
        path.join(home, 'snap', 'chromium', 'current', '.config', 'chromium'),
      ]

  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  return null
}

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2)
      args[key] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true
    }
  }
  return args
}

function out(obj) {
  console.log(JSON.stringify(obj, null, 2))
}

async function confirm(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => {
    rl.question(`\n${question} [o/N] `, answer => {
      rl.close()
      resolve(answer.toLowerCase() === 'o')
    })
  })
}

async function openBrowser(profilePath) {
  const launchOptions = {
    headless: false,
    slowMo: 80, // frappe humaine
    args: ['--start-maximized'],
  }

  if (profilePath) {
    return chromium.launchPersistentContext(profilePath, {
      ...launchOptions,
      channel: 'chrome',
    })
  }

  // Fallback : Chromium sans profil (non connecté)
  const browser = await chromium.launch(launchOptions)
  return browser.newContext()
}

// ─── LinkedIn : envoi de message ─────────────────────────────────────────────

async function linkedinMessage({ to, text, dryRun, profilePath }) {
  if (!to)   return out({ status: 'error', message: '--to requis (URL du profil LinkedIn)' })
  if (!text) return out({ status: 'error', message: '--text requis (contenu du message)' })

  console.log('\n📋 Message à envoyer :')
  console.log('─'.repeat(60))
  console.log(text)
  console.log('─'.repeat(60))
  console.log(`\n📍 Destinataire : ${to}`)

  if (dryRun) return out({ status: 'dry-run', message: 'Simulation — aucune action effectuée.' })

  const ok = await confirm('Envoyer ce message sur LinkedIn ?')
  if (!ok) return out({ status: 'cancelled', message: 'Annulé par l\'utilisateur.' })

  const ctx = await openBrowser(profilePath)
  const page = ctx.pages?.[0] || await ctx.newPage()

  try {
    // Naviguer vers le profil
    await page.goto(to, { waitUntil: 'domcontentloaded', timeout: 15000 })

    // Vérifier que l'utilisateur est connecté
    const loginBtn = page.locator('a[href*="/login"]')
    if (await loginBtn.count() > 0) {
      await ctx.close()
      return out({ status: 'error', message: 'Non connecté à LinkedIn. Connectez-vous dans Chrome d\'abord.' })
    }

    // Cliquer sur le bouton Message du profil
    const messageBtn = page.locator([
      'button:has-text("Message")',
      'button[aria-label*="Message"]',
      'a[href*="messaging/compose"]',
    ].join(', ')).first()

    await messageBtn.waitFor({ timeout: 8000 })
    await messageBtn.click()

    // Attendre la fenêtre de composition
    const composeBox = page.locator([
      'div.msg-form__contenteditable',
      'div[role="textbox"][aria-label*="message"]',
      'div[contenteditable="true"]',
    ].join(', ')).first()

    await composeBox.waitFor({ timeout: 8000 })
    await composeBox.click()

    // Taper le message caractère par caractère (comportement humain)
    await page.keyboard.type(text, { delay: 30 })

    // Attendre 1 s avant d'envoyer
    await page.waitForTimeout(1000)

    // Cliquer sur Envoyer
    const sendBtn = page.locator([
      'button.msg-form__send-button',
      'button[type="submit"]:has-text("Envoyer")',
      'button[aria-label*="Envoyer"]',
      'button[aria-label*="Send"]',
    ].join(', ')).first()

    await sendBtn.waitFor({ timeout: 5000 })
    await sendBtn.click()

    // Attendre confirmation visuelle
    await page.waitForTimeout(2000)

    await ctx.close()
    return out({ status: 'sent', message: 'Message envoyé avec succès.' })

  } catch (err) {
    await ctx.close().catch(() => {})
    return out({ status: 'error', message: `Erreur : ${err.message}` })
  }
}

// ─── LinkedIn : demande de connexion ─────────────────────────────────────────

async function linkedinConnect({ to, note, dryRun, profilePath }) {
  if (!to) return out({ status: 'error', message: '--to requis (URL du profil LinkedIn)' })

  console.log('\n📋 Note de connexion :')
  console.log('─'.repeat(60))
  console.log(note || '(sans note)')
  console.log('─'.repeat(60))
  console.log(`\n📍 Profil : ${to}`)

  if (dryRun) return out({ status: 'dry-run', message: 'Simulation — aucune action effectuée.' })

  const ok = await confirm('Envoyer cette demande de connexion LinkedIn ?')
  if (!ok) return out({ status: 'cancelled', message: 'Annulé par l\'utilisateur.' })

  const ctx = await openBrowser(profilePath)
  const page = ctx.pages?.[0] || await ctx.newPage()

  try {
    await page.goto(to, { waitUntil: 'domcontentloaded', timeout: 15000 })

    // Bouton Se connecter / Connect
    const connectBtn = page.locator([
      'button:has-text("Se connecter")',
      'button:has-text("Connect")',
      'button[aria-label*="Invite"]',
    ].join(', ')).first()

    await connectBtn.waitFor({ timeout: 8000 })
    await connectBtn.click()

    if (note) {
      // Ajouter une note personnalisée
      const addNoteBtn = page.locator('button:has-text("Ajouter une note"), button:has-text("Add a note")').first()
      if (await addNoteBtn.count() > 0) {
        await addNoteBtn.click()
        const noteBox = page.locator('textarea[name="message"]').first()
        await noteBox.waitFor({ timeout: 5000 })
        await noteBox.type(note, { delay: 25 })
      }
    }

    // Envoyer
    const sendBtn = page.locator([
      'button:has-text("Envoyer")',
      'button:has-text("Send")',
      'button[aria-label*="Envoyer l\'invitation"]',
    ].join(', ')).first()

    await sendBtn.waitFor({ timeout: 5000 })
    await sendBtn.click()
    await page.waitForTimeout(2000)

    await ctx.close()
    return out({ status: 'sent', message: 'Demande de connexion envoyée.' })

  } catch (err) {
    await ctx.close().catch(() => {})
    return out({ status: 'error', message: `Erreur : ${err.message}` })
  }
}

// ─── Soumission de formulaire de candidature ─────────────────────────────────

async function applyToJob({ url, fields, dryRun, profilePath }) {
  if (!url) return out({ status: 'error', message: '--url requis (URL du formulaire)' })

  let parsedFields = {}
  if (fields) {
    try { parsedFields = JSON.parse(fields) }
    catch { return out({ status: 'error', message: '--fields doit être un JSON valide' }) }
  }

  console.log('\n📋 Candidature à soumettre :')
  console.log('─'.repeat(60))
  console.log(`URL : ${url}`)
  if (Object.keys(parsedFields).length > 0) {
    console.log('\nChamps à remplir :')
    for (const [k, v] of Object.entries(parsedFields)) {
      console.log(`  ${k}: ${v}`)
    }
  }
  console.log('─'.repeat(60))

  if (dryRun) return out({ status: 'dry-run', message: 'Simulation — aucune action effectuée.' })

  const ok = await confirm('Ouvrir le formulaire et remplir les champs ?')
  if (!ok) return out({ status: 'cancelled', message: 'Annulé par l\'utilisateur.' })

  const ctx = await openBrowser(profilePath)
  const page = ctx.pages?.[0] || await ctx.newPage()

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })

    // Remplir les champs texte identifiés
    for (const [selector, value] of Object.entries(parsedFields)) {
      const el = page.locator(selector).first()
      if (await el.count() > 0) {
        const tag = await el.evaluate(n => n.tagName.toLowerCase())
        if (tag === 'select') {
          await el.selectOption({ label: value })
        } else if (tag === 'textarea' || tag === 'input') {
          await el.fill(value)
        } else {
          // div contenteditable
          await el.click()
          await page.keyboard.type(value, { delay: 25 })
        }
        await page.waitForTimeout(300)
      }
    }

    // Pause pour que l'utilisateur vérifie visuellement avant soumission
    const submit = await confirm('\nFormulaire rempli. Soumettre la candidature maintenant ?')
    if (!submit) {
      // Laisser le navigateur ouvert pour soumission manuelle
      console.log('\n⏸  Navigateur laissé ouvert. Soumettez manuellement quand vous êtes prêt.')
      await page.waitForTimeout(120000) // 2 min avant fermeture auto
      await ctx.close()
      return out({ status: 'manual', message: 'Formulaire rempli, soumission manuelle.' })
    }

    // Cliquer sur le bouton de soumission
    const submitBtn = page.locator([
      'button[type="submit"]',
      'button:has-text("Soumettre")',
      'button:has-text("Submit")',
      'button:has-text("Apply")',
      'button:has-text("Postuler")',
      'input[type="submit"]',
    ].join(', ')).first()

    await submitBtn.waitFor({ timeout: 8000 })
    await submitBtn.click()
    await page.waitForTimeout(3000)

    await ctx.close()
    return out({ status: 'sent', message: 'Candidature soumise.' })

  } catch (err) {
    await ctx.close().catch(() => {})
    return out({ status: 'error', message: `Erreur : ${err.message}` })
  }
}

// ─── Vérification de connexion ────────────────────────────────────────────────

async function checkLogin({ platform, profilePath }) {
  const urls = {
    linkedin: 'https://www.linkedin.com/feed/',
    indeed:   'https://www.indeed.com/myjobs',
    wttj:     'https://www.welcometothejungle.com/fr/me',
    apec:     'https://www.apec.fr/candidat/mon-espace.html',
  }

  const url = urls[platform]
  if (!url) return out({ status: 'error', message: `Plateforme inconnue : ${platform}. Options : ${Object.keys(urls).join(', ')}` })

  const ctx = await openBrowser(profilePath)
  const page = ctx.pages?.[0] || await ctx.newPage()

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    const finalUrl = page.url()
    const isLogin = finalUrl.includes('login') || finalUrl.includes('signin') || finalUrl.includes('auth')
    await ctx.close()

    return out({
      status: isLogin ? 'not-logged-in' : 'logged-in',
      platform,
      message: isLogin
        ? `Non connecté à ${platform}. Connectez-vous dans Chrome d'abord.`
        : `Connecté à ${platform}.`,
    })
  } catch (err) {
    await ctx.close().catch(() => {})
    return out({ status: 'error', message: err.message })
  }
}

// ─── Entrée principale ────────────────────────────────────────────────────────

async function main() {
  const [,, command, ...rest] = process.argv
  const args = parseArgs(rest)
  const dryRun = !!args['dry-run']
  const profilePath = args.profile || findChromeProfile()

  if (!profilePath && command !== 'check-login') {
    console.warn('⚠️  Profil Chrome non trouvé — lancement sans session existante.')
  }

  switch (command) {
    case 'linkedin-message':
      await linkedinMessage({ to: args.to, text: args.text, dryRun, profilePath })
      break

    case 'linkedin-connect':
      await linkedinConnect({ to: args.to, note: args.note, dryRun, profilePath })
      break

    case 'apply':
      await applyToJob({ url: args.url, fields: args.fields, dryRun, profilePath })
      break

    case 'check-login':
      await checkLogin({ platform: args.platform || 'linkedin', profilePath })
      break

    default:
      out({
        status: 'error',
        message: 'Commande inconnue.',
        usage: [
          'node browser.mjs linkedin-message --to <url> --text "message" [--dry-run]',
          'node browser.mjs linkedin-connect  --to <url> --note "note"    [--dry-run]',
          'node browser.mjs apply             --url <url> --fields \'{"sel":"val"}\' [--dry-run]',
          'node browser.mjs check-login       --platform linkedin|indeed|wttj|apec',
        ],
      })
  }
}

main().catch(err => {
  out({ status: 'error', message: err.message })
  process.exit(1)
})
