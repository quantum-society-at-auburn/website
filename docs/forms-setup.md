# Forms setup (one-time, manual)

Formspree's free tier is 50 submissions/month **shared across the whole account**, not per form. Signup and feedback are low-volume and fit comfortably; RSVP is recurring and can spike with weekly meetings, so it uses a Google Form instead to avoid running out of quota.

## Signup and feedback (Formspree)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create two forms (e.g. "QSA Signup", "QSA Feedback"). Each gives you a form ID like `abcd1234`.
3. Put each ID in the matching content entry's `formId` field — either directly in `src/content/forms/signup.md` / `feedback.md`, or through the Decap CMS admin panel once login is set up (see `docs/decap-oauth-setup.md`).

## RSVP (Google Forms)

1. Create a Google Form for RSVPs.
2. Send → Embed `<>` → copy the embed `src` URL (it looks like `https://docs.google.com/forms/d/e/.../viewform?embedded=true`).
3. Put that URL in `src/content/forms/rsvp.md`'s `googleFormUrl` field (or via Decap once login is set up).

## If RSVP volume ever needs custom styling

If the Google Form's look becomes a problem, revisit switching RSVP to Formspree (or a paid Formspree tier) once real attendance numbers are known.
