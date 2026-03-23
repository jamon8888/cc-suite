# CC Suite — The Ultimate Claude Code & CoWork Plugin Marketplace

> Elevate your Claude Code and Claude CoWork experience with a professional-grade suite of autonomous agents and strategic tools.

The **CC Suite** is a curated collection of plugins designed for solopreneurs, founders, and boutique agencies. It turns Claude into a full-service business partner that handles everything from product validation to technical sales and decision architecture.

---

## 🛒 Marketplace & Quick Install

You can install any plugin from this suite directly into your **Claude Code** or **Claude CoWork** environment.

### Installation via Marketplace
To install a plugin locally, use the following command from the root of this repository:

```bash
# General Syntax
claude plugin add [path-to-plugin]

# Examples
claude plugin add ./solo        # Installs the Solopreneur OS
claude plugin add ./sales       # Installs the Revenue OS
claude plugin add ./sentinel    # Installs Decision Hygiene
```

---

## 📦 Included Plugins

| Plugin | Version | Core Capability |
|--------|---------|-----------------|
| **[Solo](./solo/README.md)** | `4.0.0` | **Business OS**: Client management, PRDs, and TVA-compliant invoicing. |
| **[Sales](./sales/README.md)** | `3.0.0` | **Revenue OS**: Account research, MEDDIC coaching, and pipeline health. |
| **[Sentinel](./sentinel/README.md)** | `8.4.0` | **Decision Hygiene**: MAP scoring and pre-mortems for high-stakes choices. |
| **[Copywriter](./copywriter/README.md)** | `2.0.0` | **Content Engine**: High-conversion copy synced with your Voice DNA. |
| **[Comms Strategy](./comms-strategy/README.md)** | `2.0.1` | **Strategy OS**: Brand positioning and behavioral-science campaigns. |

---

## 🚀 Getting Started

1.  **Clone the Suite**:
    `git clone https://github.com/jamon8888/cc-suite.git`
2.  **Pick Your Plugin**: Navigate to the directory or install via the `marketplace.json` manifest.
3.  **Run Initialization**: Use `/solo:start` or `/sales:start` once installed to configure your specific business identity.

## 🏗️ Architecture
All plugins are built on the **PARA methodology** (Projects, Areas, Resources, Archives) for consistent file organization across your entire business brain.

---
*Designed for builders, by builders.*
