# QSA Website

Website for accessing slides, notes, notebooks, scheduling, forms, and everything else the Quantum Society at Auburn releases.

Built with [Astro](https://astro.build), content managed via [Decap CMS](https://decapcms.org) at `/admin`, deployed to GitHub Pages.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the content policy.

## Project structure

```text
/
├── public/            static assets, uploaded content media
│   └── admin/         Decap CMS admin panel
├── src/
│   ├── content/        slides / notes / notebooks / schedule / forms collections
│   ├── layouts/
│   ├── pages/
│   └── styles/
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`      | Installs dependencies                          |
| `npm run dev`       | Starts local dev server at `localhost:4321`    |
| `npm run build`     | Build the production site to `./dist/`         |
| `npm run preview`   | Preview the build locally, before deploying    |
