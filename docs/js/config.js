/**
 * ============================================================
 *  watsonx Orchestrate — Control Plane Click-Through Demo
 *  STORY CONFIGURATION  (edit this file to change all content)
 * ============================================================
 *
 *  Each step has:
 *    screen   – filename in ./screens/  (1.png … 8.png)
 *    bubble   – the annotation bubble
 *      title  – bold headline
 *      text   – body copy (supports basic HTML like <b>, <br>)
 *      pos    – position of the bubble box. Two modes:
 *               SIDE mode:  { side: "top"|"bottom"|"left"|"right", align: "start"|"center"|"end" }
 *               EXACT mode: { x: 0-100, y: 0-100 }  — percent of screenshot dims, top-left corner of bubble
 *    hotspot  – the pulsing click-target on the screenshot
 *                 coordinates are in PERCENT of the screenshot width/height
 *                 { x: 0-100, y: 0-100, label: "Click here" }
 *    nextLabel – optional custom text for the "Next" button
 */

window.DEMO_CONFIG = {

  title: "watsonx Orchestrate — Control Plane",
  subtitle: "A guided tour for AI Ops managers",

  steps: [

    // ── Step 1 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/1.png",
      bubble: {
        title: "1 · Control Plane -Overview",
        text:  "As an AI Ops manager you instantly see the health of all <b>live agents</b>: message success rate, positive feedback, deployment status, and a prioritised <b>Needs attention</b> panel on the right.",
        // Exact position: top-left corner of bubble in % of screenshot
        // Sits in the empty area top-left, right of the side-nav, left of "Good evening"
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: { x: 28, y: 18.8, label: "Click · Adoption tab" },
      nextLabel: "Go to Adoption →"
    },

    // ── Step 2 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/2.png",
      bubble: {
        title: "2 · Adoption - Consumption rate",
        text:  "The Adoption tab answers the key question: <b>which business unit, department, or agent drives the most usage?</b> Have a look at users per agent, onversations per user, messages per conversation — plus a per-agent breakdown table.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: { x: 23, y: 53.5, label: "Click · AskHR row" },
      nextLabel: "Drill into AskHR →"
    },

    // ── Step 3 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/3.png",
      bubble: {
        title: "3 · AskHR - Agent Detail View",
        text:  "One click reveals the full health picture for <b>AskHR</b>: Number of conversations, positive feedback, hallucination rate. The <b>Tools table</b> shows which tools need attention — e.g. <i>pto_balance_lookup</i> has a 3.3% failure rate.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: null,
      nextLabel: "Explore FinOps →"
    },

    // ── Step 4 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/4.png",
      bubble: {
        title: "4 · FinOps — Token Cost by Agent ",
        text:  "The FinOps tab gives full cost transparency: E.g., <b>8.6M tokens</b> consumed in 7 days, <b>9.6k LLM calls</b>.<br>AskGovernance leads with <b>25.7%</b> of token spend — now you can make a data-driven model-switching decision.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: { x: 29.3, y: 40.2, label: "Click · By model" },
      nextLabel: "View by Model →"
    },

    // ── Step 5 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/5.png",
      bubble: {
        title: "5 · FinOps — Token Cost by Model",
        text:  "Claude/fable-5 consumes <b>41.7% of all tokens</b> — 1.5M total. This is your lever: <b>swap an expensive model for a cheaper one</b> for high-volume, low-complexity agents and <b>cut costs immediately</b>.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: { x: 79.4, y: 72.7, label: "Click · Table view" },
      nextLabel: "See daily breakdown →"
    },

    // ── Step 6 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/6.png",
      bubble: {
        title: "6 · FinOps — Daily Token Breakdown",
        text:  "The tabular view gives you <b>exact daily numbers</b> — ideal for finance reporting and budget planning.<br>Sep 29: 648k tokens · Oct 5: 761k tokens. Input vs. Output split is always visible for chargeback models.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: { x: 42.5, y: 18.4, label: "Click · Security and Risk tab" },
      nextLabel: "Go to Security & Risk →"
    },

    // ── Step 7 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/7.png",
      bubble: {
        title: "7 · Security & Risk — Controls Summary",
        text:  "All <b>controls</b> in one view: 5 agent-level, 5 tool-level, 3 model-level. The table shows enforcement scope and when each control was last created — <b>giving Compliance full audit visibility</b>.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: { x: 79.3, y: 42.5, label: "Click · View all" },
      nextLabel: "Explore Controls library →"
    },

    // ── Step 8 ─────────────────────────────────────────────────────────────
    {
      screen: "screens/8.png",
      bubble: {
        title: "8 · Controls Library — Guardrails",
        text:  "The Controls library shows all active guardrails as cards: E.g., <b>AWS secret detector, Banking PII filter, SQL sanitizer</b> — each applied to agents, models, or MCP tools. This is the governance layer that <b>makes enterprise AI deployment safe</b>.",
        pos:   { x: 2.2, y: 3.5 }
      },
      hotspot: null,
      nextLabel: "✓ End of tour"
    }

  ]
};
