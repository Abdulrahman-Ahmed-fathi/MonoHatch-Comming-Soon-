# Netlify Deployment

This project is configured for Netlify as a Vite single-page app.

## Build Settings

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20.x`

These settings are also defined in `netlify.toml`.

## Environment Variables

Add these variables in Netlify under Site configuration > Environment variables:

```text
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key_here
```

## Routing

Client-side routes are handled by the redirect rule in `netlify.toml`, so direct visits to routes like `/login`, `/register`, and `/dashboard` should load correctly.

## Local Verification

Run the production build before deploying:

```bash
npm run build
```
