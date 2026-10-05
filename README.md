# IBM watsonx Orchestrate — Control Plane Click-Through Demo

A guided click-through demo of the **watsonx Orchestrate Control Plane** AI Ops dashboard.

**Live demo:** *(GitHub Pages URL will appear here after deployment)*

---

## What this demo shows

8 annotated steps walking through the core AI Ops views:

| Step | Screen |
|------|--------|
| 1 | **Overview** — Agent health, messages, feedback, needs-attention panel |
| 2 | **Adoption** — User engagement depth, per-agent consumption breakdown |
| 3 | **AskHR Agent Detail** — Conversations, feedback score, tool health |
| 4 | **FinOps · By Agent** — Token spend breakdown per agent |
| 5 | **FinOps · By Model** — Token spend breakdown per model |
| 6 | **FinOps · Token Trends** — Daily token table for finance reporting |
| 7 | **Security & Risk** — Controls summary, enforcement scope |
| 8 | **Controls Library** — Guardrail cards (PII filter, secrets detector, SQL sanitizer…) |

---

## Running locally

No build step required — pure HTML/CSS/JS.

```bash
cd demo
python3 -m http.server 8080
# → open http://localhost:8080
```

Or open `demo/index.html` directly in a browser (Chrome/Firefox/Safari).

---

## Customising the story

All bubble texts, hotspot positions, and screen order live in one file:

**[`demo/js/config.js`](demo/js/config.js)**

```js
{
  screen: "screens/1.png",
  bubble: {
    title: "1 · Control Plane Overview",
    text:  "Your annotation text here — <b>bold</b> and <i>italic</i> supported.",
    pos:   { x: 2.2, y: 3.5 }   // % from top-left of the screenshot
  },
  hotspot: { x: 27.6, y: 17.4, label: "Click · Adoption tab" },
  nextLabel: "Go to Adoption →"
}
```

Edit → Save → hard-reload the browser (`Cmd+Shift+R`). No build needed.

---

## Navigation

| Key | Action |
|-----|--------|
| `→` or `Space` | Next step |
| `←` | Previous step |
| `ESC` | Toggle annotation bubble |
| Click progress pill | Jump to any step |

---

## Deploying to GitHub Pages

```bash
# 1. Create repo on GitHub, then:
git init
git add .
git commit -m "Initial demo"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main

# 2. In GitHub → Settings → Pages → Source: main branch / root
#    OR use the /demo subfolder as the Pages root
```

---

## Disclaimer

All data shown in the screenshots is **synthetic demo data**. No real client data, PII, or confidential information is included.
