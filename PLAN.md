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

## [DONE] Pass 9 — Enlarge the illustration and anchor it to the header
**What:** Widened the Qcomputer illustration from 220px to 400px and changed `.center-visual` from vertically centered (`align-self` inherited `center`) to `align-self: start` with `margin-top: calc(-1 * (var(--space-xl) + var(--space-lg)))` — a negative margin that exactly cancels `main`'s own `padding-top` (`--space-xl`) plus `.contact-grid`'s `margin-top` (`--space-lg`), pulling the image up so its top edge sits flush against the bottom of the navy header. Confirmed via `getBoundingClientRect()` that the image's top and the header's bottom are both exactly `68px` — pixel-flush, not just visually close.
**Files:** `src/pages/contact.astro`
**Status:** Verified via dev-server screenshot (illustration reads as "hanging" from the header, thematically fitting since a real dilution refrigerator hangs from a top plate) and confirmed no horizontal overflow. Committed as `ea1f70f`, pushed, `deploy.yml` ran green (deploy 10s). Live: `/contact` (200).

## [DONE] Pass 10 — Remove the quantum computer illustration
**What:** Direct revert per user request: dropped the `quantumComputer` import, the `.center-visual` markup and its CSS (from Passes 8–9), and restored `.contact-grid`'s `grid-template-columns` from `1fr auto 1fr` back to `1fr 1fr`. Back to a plain two-column Team/Contact layout.
**Files:** `src/pages/contact.astro`
**Status:** Verified via dev-server screenshot — no illustration, no leftover gap. Committed as `976972a`, pushed, `deploy.yml` ran green (deploy 8s). Live: `/contact` (200).

## [DONE] Pass 11 — Contact column: fully centered, gridless icon-left links
**Goal:** Center everything in the "Contact" column (heading, logo, social links, QR), remove the bordered social grid (keep the 2×2 arrangement, drop the visible lines — same technique as the Team side's Pass 1), and give each of the 4 social links a small icon to the left of its text while keeping the QSA logo as the column's large, clear centerpiece.
**Decisions locked in (from AskUserQuestion, then revised per follow-up):** Center everything, not just the heading. All 4 links get icons. **[REVISED]** Icons are small and sit left-of-text (not large circle badges), and the QSA logo stays the dominant visual element above them. **[REVISED]** AU Involve uses a **real downloaded Auburn University logo** (Wikimedia Commons "Auburn Tigers logo.svg" — public-domain textmark) instead of a text monogram, per explicit user request. LinkedIn/Instagram/GroupMe use small hand-authored inline SVG line icons. Layout stays a 2×2 grid of rows. Instagram already showed only the handle — unchanged.
**Files:** `src/pages/contact.astro`, `src/assets/brand/AU_logo.svg` (new)
**Status:** Verified via dev-server screenshot: 4 rows each with a small icon left of its text, no grid border lines, everything centered (heading/logo/rows/QR), QSA logo clearly the largest/most prominent element. No horizontal overflow. Committed as `5c2eba0`, pushed, `deploy.yml` ran green (deploy 11s). Live: `/contact` (200).

## [DONE] Pass 12 — Drop raw URLs, clean single-line hyperlinks
**What:** Direct request to clean up spacing: LinkedIn, GroupMe, and AU Involve rows no longer show the full pasted URL beneath the label (it was wrapping 3-4 lines each); now just the platform name renders as the link. Instagram keeps its handle (`@auburnquantum`) since it's short and meaningful, not a URL.
**Files:** `src/pages/contact.astro`
**Status:** Verified via dev-server screenshot — each row is now a compact single-line hyperlink, no overflow. Committed as `e212b56`, pushed, `deploy.yml` ran green (deploy 8s). Live: `/contact` (200).

## [DONE] Pass 13 — Rename "The Team" heading to "Leadership"
**What:** Direct text change to the left column's `<h1>`.
**Files:** `src/pages/contact.astro`
**Status:** Committed as `3f6097f`, pushed, `deploy.yml` ran green (deploy 9s). Live: `/contact` (200).

## [DONE] Pass 14 — Home page: add a "Meetings" info block to the left of the hero
**Goal:** Add a small block to the left of the Landing page's hero content stating the meeting cadence, day/time, and room: biweekly, Wednesdays at 5PM, Govil Hall Room 2126.
**Constraint source:** `CLAUDE.md` reviewed ✓.
**Prior plan:** New scope — first change to `src/pages/index.astro` this session (all prior passes were Contact page only).
**Created:** 2026-09-20

**Research done:**
- Re-read `src/pages/index.astro`: `.hero` is a flex row with two children — `.hero-text` (h1 + intro paragraph, which already mentions "biweekly, Wednesdays at 5PM in the brand new Govil Hall (Stem+Ag Building A)" but no room number) and the `Qcomputer.png` illustration. `flex-wrap: wrap` already handles narrow viewports.
- Re-read `src/pages/announcements.astro` for the site's established info-block convention: a hairline `border-top` divided-list row (`.row`/`.date`/`.details`), Zilla Slab for the heading/label, muted Slate for metadata — no rounded-card/soft-shadow kit anywhere on the site. The new block should follow this same hairline convention, not introduce a card style.
- Decision: render the block as `.meeting-block`, the first child inside `.hero` (so it sits left of `.hero-text`, with the illustration staying rightmost), styled as a bordered box with a left accent rule in Signal Orange (`--color-accent`) — consistent with the site's restraint (one accent, no shadow) rather than a generic bordered-card treatment repeated on all four sides.

## Step 1: Add the meeting-info markup and styles to the home page
**What:** In `src/pages/index.astro`, add a `<div class="meeting-block">` as the first child of `.hero` (before `.hero-text`), containing a small label ("Meetings") and two lines: "Biweekly · Wednesdays, 5:00 PM" and "Govil Hall, Room 2126". Style it with `border-left: 3px solid var(--color-accent)`, `padding-left`/`padding-block` using existing spacing tokens, `font-family: var(--font-heading)` for the label, muted Slate for the detail lines — no shadow, no rounded corners beyond the site's existing 2px radius convention. Give `.hero` a `flex-basis` for the new block (e.g. `flex: 0 1 220px`) so it reads as a compact aside next to the wider `.hero-text`, and confirm the existing `flex-wrap: wrap` still stacks all three pieces cleanly on narrow viewports.
**Files:** `src/pages/index.astro`
**Verify:** `npm run build` succeeds.

## Step 2: Visual QA, build, commit, push, verify live deploy
**What:** Start the dev server (`astro dev --background`), screenshot the Landing page at desktop and narrow widths to confirm the meeting block sits to the left of the hero text, reads clearly, and doesn't crowd the illustration or break wrapping on mobile; check for horizontal overflow (`document.documentElement.scrollWidth` vs `clientWidth`), per the earlier full-bleed layout bug on Contact. Stop the server, `npm run build`, commit, push to `main`, watch `deploy.yml` via `gh run watch`, `curl` the home page to confirm 200.
**Verify:** `gh run watch` green; home page returns 200; screenshots confirm the block's position and no overflow at both widths.
**Status:** First screenshot caught a real bug: `.hero` originally had two children (`.hero-text`, illustration); adding `.meeting-block` as a third direct flex child overflowed `main`'s fixed 896px content width (200+632+280px+2 gaps > 896px), so the browser wrapped each of the three items onto its own row instead of laying meeting-block/text/image side by side. Fixed by wrapping `.meeting-block` and `.hero-text` together in a new `.hero-content` flex row (itself one flex child of `.hero`, alongside the illustration) — matches the original two-child layout `main` was sized for. Verified via `getBoundingClientRect` at a simulated 380px-wide container that `.meeting-block` stacks cleanly above `.hero-text` (both wrap correctly) and the illustration drops below on narrow widths; confirmed `document.documentElement.scrollWidth === clientWidth` (1646) at full desktop width, no horizontal overflow. Committed as `bca7eeb` (bundled with the user's own pending `vp-outreach`/`vp-programs` name edits, `"TBD"` → `"COMING SOON"`, already present locally), pushed, `deploy.yml` ran green (build 17s, deploy 10s). Live: `/` (200).

## [DONE] Pass 15 — Home page: replace the Meetings block with a condensed Announcements panel
**Goal:** Replace Pass 14's small `.meeting-block` with a full condensed-Announcements panel on the far left of the home page: an "Announcements" title linking to `/announcements`, a pinned row for the recurring biweekly meeting, and up to 3 real upcoming entries pulled from the `schedule` collection — flush against the true left edge of the viewport, not just inset left of the hero text.
**Constraint source:** `CLAUDE.md` reviewed ✓.
**Prior plan:** Supersedes Pass 14 — its `.meeting-block` copy becomes this pass's pinned row. Full research and design detail recorded in the harness plan file (`i-want-to-build-cozy-metcalfe.md`, "v2").
**Created:** 2026-09-21

**Decisions locked in (via AskUserQuestion):** condensed list shows top 3 upcoming events only (`date >= today`, sorted ascending); rows show date/name/time/location only, no description text.

## Step 1: Fetch and filter upcoming schedule data
**What:** Added `getCollection('schedule')` fetch to `index.astro`'s frontmatter, reusing `announcements.astro`'s exact sort/date-format logic (`Intl.DateTimeFormat` with `timeZone: 'UTC'`), filtered to `date.valueOf() >= Date.now()` and sliced to the first 3.
**Files:** `src/pages/index.astro`
**Verify:** `npm run build` succeeds.

## Step 2: Replace `.meeting-block` with `.announcements-panel`
**What:** Removed `.meeting-block`; added an `<aside class="announcements-panel">` with a `.panel-title` link to `${base}announcements`, a pinned `<li>` carrying the old meeting-block copy (with its `border-left: 3px solid var(--color-accent)` accent, now marking it as pinned), followed by condensed `<li>` rows per fetched event (hairline `border-top` dividers, no description, mirroring `announcements.astro`'s `.row` convention at a smaller scale).
**Files:** `src/pages/index.astro`
**Verify:** `npm run build` succeeds; markup shows the title link, pinned row, and real event row(s).

## Step 3: Break `.hero` out to full viewport width
**What:** Applied the same full-bleed technique proven on `contact.astro`'s `.contact-grid` (`margin-left/right: calc(50% - 50vw)` + `padding-left/right: var(--space-lg)`) to `.hero`, with `.announcements-panel` at `flex: 0 0 260px` so it sits flush against the page's left edge (same `--space-lg` gutter as the nav wordmark).
**Files:** `src/pages/index.astro`
**Verify:** Dev-server screenshot confirms the panel's left edge is flush with the nav wordmark's left edge.

## Step 4: Visual QA, overflow check, build, commit, push, verify live deploy
**What:** Started the dev server, screenshotted the home page — confirmed the "Announcements" title, pinned "Meetings" row, and the one real upcoming entry ("Sep 24 — Weekly Meeting: Quantum Error Correction") all render correctly, and verified via JS that the panel's left edge (32px) matches the nav wordmark's left edge (32px) exactly, and that `title.getAttribute('href')` resolves to `/website/announcements`. Confirmed `document.documentElement.scrollWidth === clientWidth` (1646) at desktop width — no horizontal overflow. Real window resize was unreliable in this environment (same limitation hit in Pass 14); relied on the same already-verified `flex-wrap: wrap` mechanism for narrow-viewport stacking rather than a live narrow-width screenshot, since the underlying wrap behavior is unchanged from the previously verified case. Stopped the server, ran final `npm run build`, committed, pushed to `main`, watched `deploy.yml` green, confirmed the home page returns 200.
**Verify:** `gh run watch` green; home page returns 200; screenshot confirms flush-left panel, pinned + real rows, correct link target, no overflow.

## Open Questions
None.

## Out of Scope
- Adding a `pinned`/`featured` field to the `schedule` content schema — the biweekly meeting stays a hardcoded row, not real collection data.
- Cleaning up the placeholder/sample `test-event.md` entry.
- Rewording the hero paragraph's own mention of the meeting cadence.
- **[NEEDS INPUT]** VP of Outreach and VP of Programs names/emails (still `"TBD"`), officer photos, and the real Instagram profile URL (`INSTAGRAM_URL` in `contact-links.ts` is still `REPLACE_WITH_IG_HANDLE` even though `INSTAGRAM_HANDLE` was updated to the real `@auburnquantum`).

## [DONE] Pass 16 — Allow non-date schedule values, and fix broken forms routing
**What:** Two fixes discovered/requested outside `/planning`, done directly:
1. A user-added `schedule` entry with `date: TBD` crashed the whole build (`schedule.date` was `z.coerce.date()`, which can't coerce "TBD"). Per the user's explicit request ("if the wrong data type is input, automatically turn it into a string and use that"), changed the schema to `z.coerce.date().or(z.string())`, and updated `announcements.astro`/`index.astro` to render a non-`Date` value as-is (instead of calling the date formatter on it) and sort it to the end of the list. The home page's condensed Announcements panel only pulls in real dated upcoming events, so an undated entry doesn't appear there until it gets a real date.
2. Investigated "where do forms show up" — found `src/pages/forms/{feedback,rsvp,signup}.astro` all called `getEntry('forms', <slug>)` for slugs that don't exist in `src/content/forms/` (real entries are `generalinfo`/`outreachvp_app`, added by the user directly), so every form page threw `Missing forms/... content entry` at build/render time — non-fatal on Linux CI (silently broken pages) but capable of crashing local Windows builds outright. Deleted the three broken static pages and replaced them with one dynamic `src/pages/forms/[slug].astro` using `getStaticPaths` off the `forms` collection, wrapped in the shared `Layout` (the old pages had no `Layout` at all, so they had no nav/footer or site styling even when they worked). Added a "Forms" section (title + list of real form titles/links, hairline-divider styling matching the schedule rows) to the bottom of both `index.astro` and `announcements.astro`, per direct request.
**Files:** `src/content.config.ts`, `src/pages/announcements.astro`, `src/pages/index.astro`, `src/pages/forms/[slug].astro` (new, replaces `feedback.astro`/`rsvp.astro`/`signup.astro`)
**Status:** Verified via `npm run build` (clean, `/forms/generalinfo` and `/forms/outreachvp_app` both generate) and dev-server screenshots (Forms section renders on both pages with working links; clicking through to `/forms/generalinfo` shows the nav/footer chrome, title, description, and the Google Form iframe — none of which the old page had). Committed as `65cadc9` (schedule date fix) and `e6f3189` (forms fix), pushed, both deploys ran green. Live: `/`, `/announcements`, `/forms/generalinfo`, `/forms/outreachvp_app` all return 200.

## [DONE] Pass 17 — Turn forms into announcements, reverse list order
**What:** Two quick direct follow-ups to Pass 16:
1. User reverted the standalone "Forms" section: removed it from `index.astro`/`announcements.astro` entirely. Instead, each form is now its own `schedule` entry (`general-interest-form.md`, `vp-outreach-application.md`, `date: "Ongoing"`) linked via the existing (previously unused) `rsvpFormSlug` field — the event name renders as a hyperlink to `/forms/{rsvpFormSlug}` when that field is set. The home page's condensed panel logic changed from "only real dated upcoming events" to "upcoming dated events (top 3) + all string-dated entries always shown" so the undated form entries (and the pre-existing "TBD" hackathon meeting) appear there too.
2. User asked to reverse the announcement order on both pages — added `.reverse()` after the existing sort on both `announcements.astro`'s `events` and `index.astro`'s combined `events` array (literal list-flip, not a sort-direction change, per explicit instruction).
**Files:** `src/pages/announcements.astro`, `src/pages/index.astro`, `src/content/schedule/general-interest-form.md` (new), `src/content/schedule/vp-outreach-application.md` (new)
**Status:** Verified via dev-server screenshots on both pages (forms render as hyperlinked "Ongoing" rows, reversed order confirmed via rendered `class="date"`/`class="mini-date"` sequence). Committed as `ad47e58` (forms-as-announcements) and `e0561d2` (reverse order), pushed, both deploys green. Live: `/`, `/announcements`, `/forms/generalinfo`, `/forms/outreachvp_app` all 200.

## [DONE] Pass 18 — Resources page: folder-driven weekly sections
**Goal:** Replace the empty, frontmatter-driven `slides`/`notes`/`notebooks` collections with a zero-friction system: any subfolder under `src/content/resources/` becomes a named section on the Resources page, and any file dropped into it automatically gets its own page with the file embedded (viewable) and downloadable — no markdown authoring, no manual registration.
**Constraint source:** `CLAUDE.md` reviewed ✓. Full research/design detail recorded in the harness plan file (`i-want-to-build-cozy-metcalfe.md`).
**Created:** 2026-09-21

**Decisions locked in (via AskUserQuestion):** Non-PDF/image files (pptx/docx/xlsx) embed via Microsoft's Office Online Viewer in production; PDFs/images embed natively always; everything else is download-only.

## Step 1: Add `src/lib/resources.ts`
**What:** `getResourceSections()`/`findResourceFile()` built on `import.meta.glob('/src/content/resources/**/*', { eager: true, query: '?url&no-inline', import: 'default' })`, parsing each path into `{ section, filename }`, natural-sorting (`Intl.Collator({ numeric: true })`) so "Week 10" doesn't sort before "Week 2", and deriving display titles/URL slugs.
**Files:** `src/lib/resources.ts` (new)

## Step 2 & 3: Rewrite the Resources index page; add the per-file dynamic page
**What:** `resources.astro` drops the old `getCollection('slides'/'notes'/'notebooks')` flat filtered list entirely and renders one `<section>` per folder. New `src/pages/resources/[section]/[file].astro` (`getStaticPaths()` off `getResourceSections()`, same shape as `forms/[slug].astro`) renders a breadcrumb, title, type-appropriate embed, and a `.button`-styled Download link.
**Files:** `src/pages/resources.astro`, `src/pages/resources/[section]/[file].astro` (new)

## Step 4: End-to-end test, 2 real bugs found and fixed
**What:** Added a real test PDF + a placeholder `.pptx` under a temporary `Week 1` folder, built, and screenshotted.
**Bugs caught:**
1. Vite's default `assetsInlineLimit` silently inlined both small test files as `data:` URIs instead of emitting real asset files — this would have broken the Office Viewer entirely (it needs a fetchable URL, not a data URI) for any real file small enough to qualify. Fixed by adding `&no-inline` to the glob's `query` string, forcing a real emitted file regardless of size.
2. In `astro dev`, Vite's `?url` resolution returns raw source-relative paths (`/src/content/resources/...`) that don't include Astro's configured `base` (`/website/`) — 404s in local preview even though the production build's URLs are correctly base-prefixed. Fixed with a `resolveUrl()` helper in `resources.ts` that prepends `import.meta.env.BASE_URL` only when `import.meta.env.DEV` is true.
**Status:** After both fixes, dev-server screenshots confirmed: Resources index shows the "Week 1" section with both files; the PDF page's iframe actually loads the file (Chrome's PDF viewer shows "1/1", confirmed via `curl` 200 on the resolved dev URL); the pptx page correctly shows the dev-mode "Preview available once this page is live" fallback (not a broken iframe) with a working Download link (`curl` 200). Production build re-verified afterward to confirm the dev-mode base-path fix didn't double-prefix production URLs (`/website/_astro/....pdf`, Office Viewer URL correctly wraps the full `https://quantum-society-at-auburn.github.io/website/...` URL). Test files then deleted; `src/content/resources/` ships genuinely empty (just `.gitkeep`) for the user's real materials.

## Step 5: Build, commit, push, verify live deploy
**Status:** Committed as `327e93b`, pushed, `deploy.yml` ran green (build 18s; deploy took longer than usual this run — several minutes — but completed successfully, no indication it was caused by this change). Live: `/resources` (200).

## Open Questions
None.

## Out of Scope
- Removing the now-unused `slides`/`notes`/`notebooks` collection declarations from `content.config.ts` — left in place, harmless.
- Supporting nested subfolders within a section, or `.ipynb`-specific preview rendering.
- **[NEEDS INPUT]** The Office Viewer embed itself hasn't been confirmed against a real deployed file yet (only URL-construction was verified) — worth checking once the user adds a real slide deck.

## Out of Scope
- Sourcing or generating actual headshot photos — only the schema field + fallback UI ship now.
- A form-based way for officers to self-edit this data (Decap CMS still paused).
