# PL Owner Simulator

So I was bored at school and latley I've really into the finicial side of Football(soccer) So I decided to make my own
you should try it, it's really fun

A Premier League club owner simulation game built with React + Vite.

## Features

- **All 20 real PL clubs** (2025-26 season) with real player squads
- **Deep tactical match engine** — attack vs defense matchups, named goal scorers, formation counters
- **8 formations** — 4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 5-3-2, 3-4-3, 4-1-4-1, 4-3-2-1
- **Visual pitch formation** — see your XI on the field, tap to substitute
- **In-depth transfer market** — scout by position, negotiate fees/wages/sell-on/bonuses
- **Financial management** — wages, PSR compliance, TV revenue, matchday income
- **Player development** — young players grow, veterans decline between seasons
- **AI transfers** — other clubs buy/sell players dynamically
- **Injury system** — realistic injury types with variable recovery times
- **News ticker** — match reports, transfers, press conferences
- **Persistent saves** — auto-saves to localStorage

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.jsx              # Main game component (monolith — works as-is)
├── main.jsx             # React entry point
├── data/
│   ├── index.js         # Barrel exports
│   ├── squads.js        # Real player data for all 20 clubs
│   ├── clubs.js         # Club metadata (budgets, stadiums, managers)
│   └── formations.js    # Formation slots, pitch layouts, tactical data
├── engine/
│   └── matchEngine.js   # Deep match simulation (extracted module)
├── components/          # (future: split UI into components)
├── utils/               # (future: save/load, helpers)
└── styles/
    └── global.css       # Base styles and animations
```

## Tech Stack

- **React 18** + **Vite 5**
- No external UI libraries — pure CSS
- Google Fonts: Oswald, JetBrains Mono, Inter
- localStorage for game saves

## Refactoring Guide

The game currently runs from a single `App.jsx` monolith. The `data/` and `engine/` 
directories contain cleanly extracted modules ready to be imported. To refactor:

1. Replace inline data in App.jsx with imports from `data/`
2. Replace inline match engine with imports from `engine/matchEngine.js`
3. Extract UI components (Pitch, PlayerRow, LeagueTable, etc.) into `components/`
4. Move save/load logic into `utils/storage.js`
