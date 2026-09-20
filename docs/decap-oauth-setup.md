# Decap CMS login setup (one-time, manual)

The site is static (GitHub Pages), so Decap's GitHub login needs an external OAuth helper. This uses Netlify's free hosted OAuth provider — no server code to run or maintain, and the real site keeps deploying to GitHub Pages exactly as before.

## 1. Create the shadow Netlify site

1. Go to [app.netlify.com](https://app.netlify.com) and sign in (or create a free account).
2. "Add a new site" → link it to the `quantum-society-at-auburn/website` GitHub repo.
3. Leave the build command empty / set it to fail or do nothing — this site is never actually used to serve content, only to host the OAuth endpoint. Its default `*.netlify.app` URL is all that's needed.
4. Note that site's domain, e.g. `qsa-website-cms-auth.netlify.app`.

## 2. Create a GitHub OAuth App

1. In the `quantum-society-at-auburn` GitHub org: Settings → Developer settings → OAuth Apps → New OAuth App.
2. Homepage URL: `https://quantum-society-at-auburn.github.io/website/`
3. Authorization callback URL: `https://api.netlify.com/auth/done`
4. Save, then generate a Client Secret.

## 3. Connect them in Netlify

1. In the shadow Netlify site: Site settings → Access control → OAuth.
2. Add the GitHub Client ID and Client Secret from step 2.

## 4. Approve the OAuth App at the org level

1. In the `quantum-society-at-auburn` org: Settings → Third-party Access → OAuth App Policy.
2. If access is restricted, explicitly approve the new OAuth App — otherwise officer logins will fail after an apparently successful GitHub login.

## 5. Point the CMS at the shadow site

In `public/admin/config.yml`, set:

```yaml
site_domain: qsa-website-cms-auth.netlify.app
```

(using the actual domain from step 1).

## Verify

Visit `https://quantum-society-at-auburn.github.io/website/admin/`, click "Login with GitHub," and confirm it round-trips through GitHub → `api.netlify.com/auth/done` → back to `/admin`, logged in.
