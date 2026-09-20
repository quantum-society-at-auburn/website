# Forms setup (one-time, manual)

All forms (signup, RSVP, feedback) are Google Forms, embedded directly on the site. No third-party form backend account needed — Google Forms has no submission cap that a club would realistically hit.

## For each form (signup, RSVP, feedback)

1. Create a Google Form.
2. Send → Embed `<>` → copy the embed `src` URL (looks like `https://docs.google.com/forms/d/e/.../viewform?embedded=true`).
3. Put that URL in the matching content entry's `googleFormUrl` field — either directly in `src/content/forms/signup.md` / `rsvp.md` / `feedback.md`, or through the Decap CMS admin panel once login is set up (see `docs/decap-oauth-setup.md`).

## Styling note

An embedded Google Form keeps Google's own visual styling inside the iframe — the page around it (title, description, layout) is still fully custom, but the form itself can't be restyled to match the site. If that becomes a problem later, a custom-styled form would need a real backend (Formspree, or a serverless function), which isn't set up here.
