---
name: invoice-generator
description: "Use this skill when the user asks to 'create invoice', 'invoice for', 'bill [client]', 'generate invoice', or 'facture pour'. Handles TVA automatically based on business profile — do not default to 20% without checking VAT registration status."
---

# Skill: Invoice Generator

Creates professional invoices with correct TVA treatment, legal mentions, and auto-numbering. French legal requirements enforced by default.

## STEP 0 — VAT STATUS CHECK (mandatory, changes everything)

```
READ data/2-Domaines/business-profile.json → extract: vat_registered, tax_number, regime
```

| Regime | TVA rule | Required invoice mention |
|--------|----------|--------------------------|
| Micro-entrepreneur (non VAT) | TVA = 0% | "TVA non applicable, art. 293 B du CGI" |
| VAT-registered (any regime) | TVA = 20% (default), apply reduced rates if applicable | TVA number (FRXX XXX XXX XXX) on every invoice |

**If business-profile.json missing or VAT status unset:**
> "Before I create this invoice, I need to know your VAT status. Are you a micro-entrepreneur (non assujetti TVA) or VAT-registered? This determines the legal structure of the invoice."

Never assume. Never default to 20% without confirmation.

## STEP 1 — READ CLIENT DATA

```
READ data/1-Projets/clients/[client-slug].md → extract: company, contact, email, address
```

If client file exists: use it. Do not ask the user to re-enter contact details.
If client file missing: ask for details AND offer to create the client card.

Report: "Reading DesignCo client card... Contact: [name], Email: [email], Address: [address]. Correct?"

## STEP 2 — INVOICE NUMBERING

Scan `data/1-Projets/invoices/` for highest existing number in YYYY.
Next number = `INV-YYYY-NNN` (zero-padded, e.g. INV-2026-007).
If no invoices exist: start at `INV-[current year]-001`.

## STEP 3 — LINE ITEMS

Ask: "What are you invoicing for?"
- **Hourly**: task name + hours + rate per task
- **Project/milestone**: deliverable name + agreed price
- **Retainer**: use agreed monthly fee from client card

Calculate:
- Subtotal = sum of line items
- TVA = based on Step 0 (0% or applicable rate)
- **Total TTC** = Subtotal + TVA

## STEP 4 — PAYMENT TERMS

Default: Net 30. Options: À réception, Net 15, Net 30, Net 45, Net 60.
Due date = issue date + payment terms.

## STEP 5 — GENERATE INVOICE WITH LEGAL MENTIONS

```markdown
# FACTURE — [INV-NUMBER]

**Émetteur**
[Your name / company name]
[Address]
[SIRET: XXXXXXXXXXXXXXXXX]
[TVA intracommunautaire: FRXX XXX XXX XXX — only if VAT-registered]

**Client**
[Company name]
[Contact name]
[Address]

**Date d'émission**: [Date]
**Date d'échéance**: [Due date]

---

## Détail des prestations

| Désignation | Qté | PU HT | Montant HT |
|-------------|-----|-------|-----------|
| [Line item 1] | | | |
| [Line item 2] | | | |

**Sous-total HT**: [X]
**TVA (20%)**: [X]  ← OR: "TVA non applicable, art. 293 B du CGI" if micro
**TOTAL TTC**: [X]

---

## Modalités de paiement

Paiement par virement bancaire sous [N] jours.
IBAN: [IBAN from business profile]

**Pénalités de retard**: En cas de retard de paiement, des pénalités de retard
au taux de [3× taux légal en vigueur] seront appliquées, ainsi qu'une indemnité
forfaitaire pour frais de recouvrement de 40 €.
(Art. L.441-10 et L.441-6 du Code de commerce)

[If VAT-registered]: TVA acquittée sur les débits.
```

**Mandatory legal mentions for French invoices:**
- [ ] SIRET number
- [ ] Penalties for late payment (taux BCE + 10 points OR 3× taux légal)
- [ ] Indemnité forfaitaire 40€ for B2B invoices
- [ ] TVA mention (either rate or "non applicable art. 293 B")
- [ ] Payment method and IBAN


## TEAM MODE — Revenue Split

After calculating totals, check team.json:

```
READ data/2-Domaines/team.json → mode, revenue_split, members
```

If mode = duo or team AND revenue_split is defined:

```
Invoice total: €[X]

Revenue split for this invoice:
  [Member 1]: €[X × share_1] ([N]%)
  [Member 2]: €[X × share_2] ([N]%)

Apply this split? [Yes / Custom split for this invoice / Skip]
```

If confirmed, write to invoice file:
```
**Revenue split**: [Member 1] €[X] · [Member 2] €[X]
```

This feeds `financial-health` per-member breakdown.

## STEP 6 — SAVE AND CONFIRM

Save as `data/1-Projets/invoices/INV-YYYY-NNN.md`
Set status: Draft

Ask: "Ready to mark as Sent? I can also update the client card with this invoice amount."

If marked Sent: update client card revenue summary.

---

## Integration Points
- **Feeds into**: `financial-health`, `invoice-reminder-agent`
- **Reads from**: `business-profile.json` (VAT status, IBAN), client cards
