# Plan: QSA Website — Design & Build the 4 Core Pages (using real brand assets)

**Goal:** A sleek, deliberately non-templated Astro site with 4 working pages — Landing, Resources, Announcements, Contact — sharing one nav/footer shell, built around the club's real logo/brand assets and a rigorous anti-generic design process, not guessed colors.
**Constraint source:** `CLAUDE.md` reviewed ✓ — dev server must be run via `astro dev --background` (managed with `astro dev status` / `astro dev logs` / `astro dev stop`).
**Prior plan:** Replaces the first draft of this same design/build plan (written earlier this session at this path) — reworked in place after the `frontend-design` skill was installed and real brand assets were found in `media/`. The earlier environment-setup plan is tracked separately at `C:\Users\shlok\.claude\plans\i-want-to-build-cozy-metcalfe.md` (now also holding a copy of this plan) and is **[DONE]**. Decap CMS's remaining manual OAuth setup is explicitly **paused** per the user — out of scope here.
**Created:** 2026-09-20 · **Reworked:** 2026-09-20 (new `frontend-design` skill installed; real brand assets found in `media/`)

**Decisions locked in (do not revisit):**
- 4 pages: Landing, Resources, Announcements, Contact.
- Announcements reuses the existing `schedule` content collection (no new collection).
- Resources is one combined, filterable list across the existing `slides` / `notes` / `notebooks` collections (filterable by type and/or tag).
- Contact is static info only — no form.
- **Real brand assets exist at repo root `media/`** (4 PNGs) and must be used, not replaced with generic placeholders:
  - `QSA_Logo_with_text.png` — full logo, navy circle + orange "Q"-globe-arrow mark + wordmark
  - `Q_blank.png` — the orange mark alone, transparent background (favicon/compact-nav candidate)
  - `Q_bg.png` — mark on navy circle, no text
  - `Qcomputer.png` — stylized quantum-computer illustration, orange/brown on transparent background (hero-visual candidate)
- **Real palette sampled directly from the logo's pixels** (not guessed): Ink Navy `#1F1D3D`, Signal Orange `#FF8000`, White `#FFFFFF`. This supersedes the placeholder indigo/off-white palette from the earlier environment-setup pass.

## Skills/plugins/agents for this phase (reworked with what's newly installed)

The user installed the `frontend-design` plugin (skill: `frontend-design:frontend-design`) and added the `superpowers-marketplace` marketplace (no plugin from it installed yet — nothing to act on there). Checked `ListAgents`: no new dedicated design *agent* was added, just the skill.

| Tool | Verdict | Why |
|---|---|---|
| `frontend-design:frontend-design` | **Use — now the primary design methodology for this phase** | Newly installed, directly fills the gap flagged in the prior plan ("no dedicated design skill exists"). Its process (loaded and summarized in Step 3 below): state subject/audience/job → brainstorm a named color/type/layout/principles token system → **self-critique that plan against its own documented list of "AI-generated design tells"** (warm-cream-#F4F1EA+serif+terracotta; near-black+neon accent; SaaS identical-rounded-card kit with the same soft grey shadow; ALL-CAPS tracked eyebrows; em-dash labels; '→' on every link/button; ambient scroll-triggered motion) → only then build → screenshot-critique. This plan follows that process rather than skipping straight to code. |
| `claude-in-chrome` | **Use — now required, not optional** | The skill explicitly calls for screenshot-based self-critique ("a picture is worth 1000 tokens") — this is how that happens. |
| `run` skill / `astro dev --background` | Use | Per `CLAUDE.md`'s own convention for local preview. |
| WebSearch | Use, lightly, if at all | Mostly superseded now — real brand assets ground the palette/subject directly, so there's less need to research reference sites for inspiration. |
| `code-review` | Use before final push | Unchanged from before. |
| `dataviz` | Skip | No charts on any of the 4 pages. |
| `design-mirror` (Bright Data) | **Skip, more firmly than before** | We now have real brand assets to ground the design in — no reason to mirror an external site's look at all. |
| `small-business:canva-creator` / `brand-style` | Skip | A real logo already exists; no brand-asset generation needed. |

---

## [DONE] Step 1: Remove the throwaway collections-test page
**What:** Delete `src/pages/collections-test.astro`.
**Why:** It was only scaffolding-phase verification; the real pages built in this plan supersede it.
**Verify:** `npm run build` still succeeds with one fewer route.

## [DONE] Step 2: Bring the real brand assets into the project
**What:** `git mv` the 4 files from repo-root `media/` into `src/assets/brand/`, then remove the now-empty `media/` folder.
**Why:** `media/` at repo root is outside both `public/` and `src/`, so Astro doesn't serve or process it at all. `src/assets/` (not `public/`) is chosen so the logo/hero art go through Astro's `astro:assets` image pipeline — automatic resizing/WebP output — instead of shipping raw multi-hundred-KB PNGs verbatim.
**Files:** `media/*.png` → `src/assets/brand/*.png`
**Verify:** Files exist under `src/assets/brand/`; `media/` no longer exists; `npm run build` still succeeds.

## [DONE] Step 3: Run the frontend-design two-pass design-plan process — final token system recorded as a comment block at the top of `src/styles/global.css`
**What:** Following the loaded `frontend-design` skill's required process, before writing any page code:
1. **State the brief explicitly:** subject = a student quantum-computing/physics club at Auburn University; audience = current + prospective members (students); job-to-be-done = find slides/notes/notebooks/announcements and contact info fast, presented with real technical/academic character rather than generic club-site polish.
2. **Brainstorm a token system**, grounded in the sampled logo colors, as a concrete proposal:
   - *Color* (named, 4–6 hexes): Ink Navy `#1F1D3D` (headings, nav/footer band, primary text), Signal Orange `#FF8000` (links, CTAs, active states), Paper `#F4F5F7` (main background — a cool light neutral, deliberately **not** the skill's flagged warm-cream `#F4F1EA` "AI-tell"), Slate `#5A5E72` (secondary/muted text), Hairline `#DDE1E8` (borders/dividers), Ember `#C96A12` (darker orange for hover/pressed states, contrast-checked against Paper).
   - *Type*: two roles (headline, body/UI) — **specific typeface names deferred to this step's own execution**, chosen only after checking 2–3 candidate pairings against the skill's tell list (reject anything landing on Inter/Poppins/Space Grotesk-by-default, or the flagged cream-serif-terracotta combo). Directional hint only: something with real technical/academic character that echoes the logo's own slab-serif wordmark, not a generic SaaS grotesque.
   - *Layout*: one-sentence concept + ASCII wireframe per page (Landing, Resources, Announcements, Contact) — produced in this step, not guessed in advance here.
   - *Principles*: 2–3 sentences on what makes this specific page unique (e.g., leaning into the literal quantum-computer illustration as the landing hero, per the skill's "open with the most characteristic thing in the subject's world" guidance — not a generic hero-text-plus-gradient treatment).
3. **Self-critique line-by-line** against the skill's explicit tell list (cream+serif+terracotta; near-black+neon; SaaS identical-rounded-card kit with uniform soft-grey shadow; ALL-CAPS eyebrows; em-dash labels; monospace micro-labels; '→' appended to links; scattered fade-slide-up-per-section motion) and revise anything that matches by default rather than by deliberate choice for this brief.
**Why:** This is the skill's own mandated process — "only after you've confirmed the relative uniqueness of your design plan should you start to write the code" — not an optional nicety.
**Files:** none (planning artifact; can be jotted as a comment block at the top of `src/styles/global.css` for traceability)
**Verify:** A finalized token system (final hexes, named type roles with real typeface names, one-line layout concepts + wireframes for all 4 pages) exists and has been explicitly checked against the tell list before Step 4 begins.

## [DONE, REVISED] Step 4: Implement the finalized tokens — link color darkened from the planned Ember #C96A12 to #A6550D after a contrast script showed #C96A12 measured 3.47:1 on Paper (fails WCAG AA 4.5:1); #A6550D measures 4.90:1
**What:** Replace the placeholder tokens in `src/styles/global.css` with the token system finalized in Step 3; self-host the chosen typefaces into `public/fonts/`.
**Files:** `src/styles/global.css`, `public/fonts/*.woff2`
**Verify:** `npm run build` succeeds.

## [DONE] Step 5: Build the shared Nav + Footer with the real logo, and wire into `Layout.astro`
**What:** Add `src/components/Nav.astro` (using `Q_blank.png` or the full logo via `astro:assets`' `<Image>` as the mark, links to the 4 pages, current page indicated structurally — not via a generic active-underline default) and `src/components/Footer.astro` (contact placeholder + copyright), both rendered from `src/layouts/Layout.astro`. Regenerate `public/favicon.svg`/`.ico` from `Q_blank.png` (replacing Astro's default placeholder favicon still in place from scaffolding).
**Files:** `src/components/Nav.astro`, `src/components/Footer.astro`, `src/layouts/Layout.astro`, `public/favicon.svg`, `public/favicon.ico`
**Verify:** Any page using `Layout` shows the real logo in nav and the real favicon in the browser tab; nav links resolve under the `/website/` base path.

## [DONE] Step 6: Build the Landing page
**What:** Replace the placeholder `src/pages/index.astro` with a real landing page whose hero uses `Qcomputer.png` as the characteristic opening visual (per the skill's hero guidance), a short club intro grounded in the actual subject (quantum computing/physics, Auburn), and links into Resources, Announcements, and Contact.
**Files:** `src/pages/index.astro`
**Verify:** Page renders through `Layout`, hero visual displays correctly, links navigate to the other 3 pages.

## [DONE] Step 7: Build the Announcements page
**What:** Add `src/pages/announcements.astro` reading `getCollection('schedule')`, sorted by `date`, listing `eventName`/`date`/`time`/`location`/`description`.
**Files:** `src/pages/announcements.astro`
**Verify:** Page lists the existing `test-event` schedule entry, correctly sorted/formatted.

## [DONE] Step 8: Build the Resources page
**What:** Add `src/pages/resources.astro` merging `getCollection('slides')`, `getCollection('notes')`, `getCollection('notebooks')` into one list, each item tagged with its type, with a small inline (no-framework) JS filter by type and tag.
**Files:** `src/pages/resources.astro`
**Verify:** Page lists all 3 existing test entries with working type/tag filtering; no framework dependency added to `package.json`.

## [DONE] Step 9: Build the Contact page
**What:** Add `src/pages/contact.astro` with static club contact info (email, socials/Discord, meeting time/location), using clearly-marked placeholders until real values are supplied.
**Files:** `src/pages/contact.astro`
**Verify:** Page renders through `Layout`; placeholders are visibly marked as such, not presented as real info.

## [DONE] Step 10: Refresh placeholder content with realistic sample copy
**What:** Update the existing test entries in `src/content/{slides,notes,notebooks,schedule}/` with more realistic-sounding (but still clearly sample) titles/descriptions, grounded in the actual subject matter (quantum computing topics), so Step 11's visual QA judges real-looking content density.
**Files:** `src/content/slides/test-slide.md`, `src/content/notes/test-note.md`, `src/content/notebooks/test-notebook.md`, `src/content/schedule/test-event.md`
**Verify:** `npm run build` succeeds; Resources/Announcements pages show the refreshed sample copy.

## [DONE, PARTIAL] Step 11: Visual QA / self-critique pass with a real browser
**What:** Start the dev server with `astro dev --background` (per `CLAUDE.md`), then use `claude-in-chrome` to screenshot all 4 pages at a desktop and a mobile width. Critique against: (a) the Step 3 design plan — does it match what was proposed; (b) the skill's tell list again, now that it's rendered, not just planned; (c) the skill's restraint guidance — "spend your boldness in one place... remove one accessory." Adjust and re-screenshot until it holds up. Stop the server with `astro dev stop` when done.
**Files:** whichever of the above need adjustment based on what's actually seen.
**Verify:** Screenshots of all 4 pages at both widths look intentional and consistent, use the real logo/hero assets correctly, and don't match the skill's documented generic-tell patterns; no layout overflow/breakage at mobile width.
**Status:** Desktop screenshots (1568px) of all 4 pages confirmed against the tell list — passes (navy/orange/paper palette clearly distinct from the flagged cream+serif+terracotta and near-black+neon combos, divided-list rows not SaaS cards, no ALL-CAPS eyebrows/em-dash labels/arrow-suffixed links, contrast-checked CTA/links). Caught and fixed a real off-by-one date bug (UTC-parsed dates formatted in local timezone showed one day early) by adding `timeZone: 'UTC'` to both date formatters. Resources filter interaction confirmed working (click-tested).
**Known gap:** `resize_window` did not actually narrow the render viewport in this sandbox (screenshots stayed ~1568px wide regardless of requested size, tried twice on two different tabs) — true mobile screenshots could not be captured. Mobile-safety was instead verified by CSS/layout audit: found and fixed a real overflow risk (4 nav links at `gap: 2rem` with no wrap would exceed a ~326px available width on a 390px phone) by adding `flex-wrap: wrap` and a reduced-gap media query to `Nav.astro`. All other layouts (hero, resource/announcement rows, contact) use flexible/wrapping CSS with no fixed widths large enough to overflow. This is a lower-confidence check than an actual screenshot — worth a real device/DevTools check later if mobile issues are reported.

## [DONE] Step 12: Build, commit, push, and verify the live deploy
**What:** `npm run build` one final time, commit, push to `main`, watch the existing `deploy.yml` workflow (`gh run watch`), then `curl` the live URLs for all 4 pages to confirm 200s.
**Verify:** `gh run watch` shows both jobs green; all 4 live page URLs under `https://quantum-society-at-auburn.github.io/website/` return 200.
**Status:** Committed as `ccb042f`, pushed, `deploy.yml` ran green (build 16s, deploy 8s). All 4 pages confirmed live: `/` (200), `/resources` (200), `/announcements` (200), `/contact` (200).

---

## Open Questions
- **[NEEDS INPUT]** Real contact info for the Contact page (club email, Discord/Instagram/other social links, general meeting time/location) — Step 9 ships with clearly-marked placeholders until this is provided.
- **[DECIDED DURING BUILD, not now]** Exact typeface names — deliberately deferred to Step 3's own brainstorm-and-critique process rather than picked in this planning pass, per the skill's methodology.

## Out of Scope
- Decap CMS OAuth setup (`docs/decap-oauth-setup.md`) — explicitly paused this session.
- Real club content for slides/notes/notebooks/announcements — Step 10 only refreshes sample copy, not actual content.
- Any additional pages beyond the 4 listed.
- Generating new brand imagery — the 4 existing files in `media/` are used as-is (resized/optimized via `astro:assets`, not redrawn).

---

# Plan: QSA Website — Contact Page Redesign (Officer Profiles → Team/Contact Split)

**Goal:** Replace the Contact page's generic Email/Discord/Instagram/Meetings block with a structured layout: 4 officer profiles (President, VP Operations, VP Outreach, VP Programs), the club logo, and AU Involve/GroupMe/social links — evolved across two passes this session.
**Constraint source:** `CLAUDE.md` reviewed ✓.
**Created:** 2026-09-20

## [DONE] Pass 1 — Officer profiles + club links (two-column: officers left, logo/AU Involve/GroupMe+QR right)
Added an `officers` content collection (`role`/`name`/`email`), 4 officer entries with placeholder name/email, a `src/data/contact-links.ts` constants file (`AU_INVOLVE_URL`, `GROUPME_URL`), and the `qrcode` npm package for build-time SVG QR generation. Rebuilt `src/pages/contact.astro` as a 2-column flex layout: 4 officers in a 2×2 square grid (left), logo + AU Involve link + GroupMe link/QR (right). Committed as `c324864`, deployed green, verified live (200). Full detail in the mirrored plan at `C:\Users\shlok\.claude\plans\i-want-to-build-cozy-metcalfe.md`.

## [DONE] Pass 2 — "The Team" / "Contact" split, circular headshots, social link grid
**What:** Reworked the same page per a follow-up request: left column retitled "The Team" (2×2 officer grid, each profile now has a circular headshot slot — added an optional `photo` field to the `officers` schema via Astro's `image()` content-collection helper, falls back to a navy initials circle when unset); right column retitled "Contact" with the logo enlarged (140px → 220px) and a new 2×2 square grid of social links (LinkedIn, Instagram, GroupMe, AU Involve — added `LINKEDIN_URL`/`INSTAGRAM_URL`/`INSTAGRAM_HANDLE` to `contact-links.ts`), with the GroupMe QR code kept separate, below that grid.
**Bugs caught during visual QA (real, not hypothetical):**
1. Two `max-width: 420px` columns with `gap: var(--space-xl)` (4rem) summed wider than `main`'s content box, wrapping to a single column instead of sitting side by side — fixed by reducing the gap to `var(--space-lg)`.
2. Long unbroken placeholder strings (emails, URLs) in the 2×2 grid cells caused a CSS-grid "blowout": with no `min-width: 0` on the grid tracks, cell content overflowed and visually collided with the sibling column. Fixed with `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)`, `min-width: 0` on the column/cell elements, and `overflow-wrap: anywhere` on cell text.
**Files:** `src/content.config.ts`, `src/data/contact-links.ts`, `src/pages/contact.astro`
**Verify:** `npm run build` succeeds; dev-server screenshots confirm both squares render side by side with no overlap; `gh run watch` green; live `/contact` returns 200.
**Status:** Committed as `d9ae9ce`, pushed, `deploy.yml` ran green (build 14s, deploy 8s). Live: `/contact` (200).

## [DONE] Pass 3 — Team section: borderless spacing, bigger headshots, name-first hierarchy
**What:** Refinement request via the `frontend-design` skill, scoped to the left "The Team" column only (right "Contact" column untouched). Removed the hairline-bordered grid lines from `.officers` while keeping the 2×2 square arrangement, replacing the collapsed-border spacing with an even `gap: var(--space-xl)`. Enlarged headshot circles (real photo and initials-fallback) from 72px to 128px. Reordered each profile from Position → Name → Email to Name → Position → Email, with descending font sizes (name 1.25rem largest, role 1rem muted, email 0.875rem smallest) to match.
**Files:** `src/pages/contact.astro`
**Verify:** `npm run build` succeeds; dev-server screenshot confirms no visible grid lines, even square spacing, 128px headshots, and the Name → Position → Email size hierarchy; right column unaffected.
**Status:** Committed as `261e957`, pushed, `deploy.yml` ran green (build 12s, deploy 10s). Live: `/contact` (200).

## [DONE] Pass 4 — Team section: centered layout, bigger profiles, muted email color
**What:** Direct follow-up request (no re-plan needed): centered the Team column's content and heading, enlarged headshot/initials circles from 128px to 150px, and changed the email link color to match the muted position-label color.
**Files:** `src/pages/contact.astro`
**Status:** Committed as `c8b45ba`, pushed, `deploy.yml` ran green (deploy 8s). Live: `/contact` (200). Visual QA also revealed the user has locally filled in real officer names/emails and real social URLs (uncommitted) — flagged to the user that the name fields carry literal brackets (e.g. `"[Shlok Chatterjee]"`) left over from the placeholder convention, left untouched since it's their own in-progress data edit.

## [DONE] Pass 5 — Fill in real officer info and club social links
**What:** Stripped the leftover placeholder brackets from the President and VP of Operations name fields (`"[Shlok Chatterjee]"` → `"Shlok Chatterjee"`, `"[Jack Elsea]"` → `"Jack Elsea"`) and committed the user's real data: President/VP of Operations names+emails, VP of Outreach/VP of Programs marked `"TBD"`, and real AU Involve/GroupMe/LinkedIn/Instagram URLs in `contact-links.ts`.
**Files:** `src/content/officers/*.md`, `src/data/contact-links.ts`
**Status:** Committed as `e28ab36`, pushed, `deploy.yml` ran green (deploy 10s). Live: `/contact` (200).

## [DONE] Pass 6 — Center each column within its own half of the page
**What:** The Team and Contact columns previously sat as a packed flex row (flush together near the middle of `main`, not centered within their own halves). Switched `.contact-grid` to a two-track CSS grid (`grid-template-columns: 1fr 1fr`) with `justify-items: center`, so each `max-width: 420px` column now centers within its own half; added a 640px breakpoint (`grid-template-columns: 1fr`) to replace the stacking behavior the old `flex-wrap` provided.
**Files:** `src/pages/contact.astro`
**Status:** Verified via dev-server screenshot — Team column centered in the left half, Contact column centered in the right half. Committed as `c3783db`, pushed, `deploy.yml` ran green (deploy 8s). Live: `/contact` (200).

## [DONE] Pass 7 — Make the halves real (full-page-width breakout)
**What:** Pass 6's centering was a no-op visually: `.contact-grid` was still confined to `main`'s 960px content box, so each "half" was only ~430px wide — barely wider than the 420px column itself, leaving no visible room to center into. Broke `.contact-grid` out to full viewport width with the standard `margin-left/right: calc(50% - 50vw)` technique so each half is a genuine half of the browser window, with `justify-items: center` now centering each column within real screen-half space.
**Bug caught during verification:** the breakout technique introduced ~8px of horizontal page overflow (measured via `document.documentElement.scrollWidth` vs `clientWidth`) from the vw/% scrollbar-width mismatch — confirmed with `window.scrollTo` that the page could actually scroll sideways. Fixed by adding `overflow-x: hidden` to `html` in `global.css` (added to `body` first, which didn't work — the viewport scroller here is `documentElement`, not `body`); re-verified `scrollX` stays `0` after `scrollTo(500, 0)`.
**Files:** `src/pages/contact.astro`, `src/styles/global.css`
**Status:** Committed as `645dfa7`, pushed, `deploy.yml` ran green (deploy 9s). Live: `/contact` (200).

## [DONE] Pass 8 — Bigger profiles, left-aligned text, quantum computer illustration
**What:** Headshot/initials circles enlarged from 150px to 220px; the Team column's `max-width` widened from 420px to 560px so two 220px circles still fit per row; each profile's name/position/email now renders left-aligned (only the "The Team" `h1` itself stays centered — text-align:center moved from the whole `.team-column` to just its `h1`, and the `margin: 0 auto` centering was dropped from the headshot images). Added a third grid column (`grid-template-columns: 1fr auto 1fr`) holding the `Qcomputer.png` illustration (already used as the Landing hero, reused with the same alt text) centered in the gap between the Team and Contact columns.
**Files:** `src/pages/contact.astro`
**Status:** Verified via dev-server screenshot at full scroll depth (illustration renders centered between the columns, TBD profiles scale correctly, footer/QR section unaffected) and confirmed no horizontal page overflow (`scrollWidth === clientWidth`). Committed as `14338ab`, pushed, `deploy.yml` ran green (deploy 10s). Live: `/contact` (200).

## Open Questions
- **[NEEDS INPUT]** VP of Outreach and VP of Programs names/emails (still `"TBD"`), officer photos, and the real Instagram profile URL (`INSTAGRAM_URL` in `contact-links.ts` is still `REPLACE_WITH_IG_HANDLE` even though `INSTAGRAM_HANDLE` was updated to the real `@auburnquantum`).

## Out of Scope
- Sourcing or generating actual headshot photos — only the schema field + fallback UI ship now.
- A form-based way for officers to self-edit this data (Decap CMS still paused).
