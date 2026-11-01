# Dharshana S – Developer Portfolio

React + Vite portfolio. All content comes from `src/data.js`; edit that file to change text, links or projects.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Resume
The download button uses `public/Dharshana_S_Resume.pdf`. To update it, replace that file and keep the same name.

## Deploy
- **Vercel / Netlify:** push to GitHub, import the repo, build command `npm run build`, output `dist`.
- **GitHub Pages:** run `npm run build`, then publish the contents of `dist/` (for example with the `gh-pages` branch or a GitHub Actions Pages workflow). The build uses relative paths, so it works under a repo sub-path.

## Notes
- The contact form opens the visitor's email app with a pre-filled message (`mailto:`). It does not send messages itself. For in-page sending, connect a form service such as Formspree or EmailJS (needs an account/key).
- No live-demo buttons are shown because no deployment URLs were provided. Add a `demo` field to a project in `src/data.js` and a button in `App.jsx` once you have them.
- Fonts load from Google Fonts; the page falls back to system fonts offline.
