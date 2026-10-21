# GitHub Digital Twin

An interactive **digital twin** of your real GitHub activity — part dashboard, part data art.

> Visualize your contribution history, language usage, coding patterns and commit activity in a living, animated interface.

## Features (MVP)

- Live contribution calendar (animated)
- Language breakdown (donut + force-directed network)
- Key stats cards (commits, streak, stars, PRs)
- Click any day to see actual commit messages
- Dark / light mode
- Responsive design

## Planned / Stretch

- Particle system driven by commit volume
- Coding personality summary ("Night Owl", "Weekend Warrior"...)
- Shareable summary card (export as image)
- Time-lapse of activity over years
- Optional 3D skyline view

## Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Framework    | React + Vite            |
| Styling      | Tailwind CSS            |
| Charts       | Recharts + D3           |
| Animation    | Framer Motion           |
| Data         | GitHub REST + GraphQL API |
| State        | React Query (optional)  |

## Getting Started

### 1. Clone

```bash
git clone https://github.com/ahalya7259-lgtm/github-digital-twin.git
cd github-digital-twin
```

### 2. Install

```bash
npm install
```

### 3. Environment

Create a `.env` file:

```env
VITE_GITHUB_TOKEN=your_personal_access_token
VITE_GITHUB_USERNAME=your_github_username
```

> Create a token at: https://github.com/settings/tokens  
> Scopes needed: `read:user`, `repo` (public data is enough for most features)

### 4. Run

```bash
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── api/
│   └── github.js           # GitHub API helpers
├── components/
│   ├── ContributionGraph.jsx
│   ├── LanguageNetwork.jsx
│   ├── StatsCards.jsx
│   ├── DayDetailPanel.jsx
│   └── Header.jsx
├── hooks/
│   └── useGitHubData.js
├── utils/
│   ├── processContributions.js
│   └── colorScale.js
├── App.jsx
├── main.jsx
└── index.css
```

## How it works

1. Fetches your public profile, repositories and contribution calendar via GitHub API
2. Processes the data into visual-ready formats
3. Renders interactive charts and the contribution grid
4. Clicking a day loads the commits for that date

## Author

**Ahalya** — BCA Graduate | Aspiring Data Analyst  
GitHub: [ahalya7259-lgtm](https://github.com/ahalya7259-lgtm)  
LinkedIn: [linkedin.com/in/ahalya-k-096a6a30a](https://linkedin.com/in/ahalya-k-096a6a30a)

## License

MIT
