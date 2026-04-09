# Interactive Calendar Component

A responsive, interactive calendar built with React. Designed to feel like a physical wall calendar — hero image up top, clean date grid, and a notes section that actually saves your stuff.

## Features

- **Wall calendar layout** — hero photo that changes every month, spiral ring strip at the top
- **Date range selection** — click a start date, click an end date, days in between get highlighted
- **Notes** — write anything for the month, auto-saved to localStorage so it survives a refresh
- **Responsive** — side-by-side on desktop, stacks vertically on mobile

## Tech Stack

- React 18 (Create React App)
- CSS Modules for styling
- localStorage for note persistence

## Project Structure

```
src/
├── components/
│   ├── Calendar.jsx          # main component, holds all state
│   ├── Calendar.module.css
│   ├── DateCell.jsx          # single day cell, handles range visual states
│   ├── DateCell.module.css
│   ├── Notes.jsx             # notes textarea + range info panel
│   └── Notes.module.css
├── utils/
│   └── dateUtils.js          # pure helpers — date math, formatting, storage keys
├── App.js
├── App.css
├── index.js
└── index.css
```

## Getting Started

```bash
git clone https://github.com/your-username/calendar.git
cd calendar
npm install
npm start
```

Opens at `http://localhost:3000`

## How It Works

**Calendar grid** — built as a 42-cell array (6 rows × 7 cols, Monday-first). Leading and trailing cells show greyed-out days from adjacent months.

**Date range selection** — managed with two state variables (`rangeStart`, `rangeEnd`) and a `pickingEnd` boolean flag. First click sets the start, second click sets the end. If you click backwards it swaps them automatically.

**Notes** — each month gets its own localStorage key (`cal_notes_YYYY_M`). Notes reload whenever you navigate to a different month.

## Deployment

Works out of the box with Vercel or Netlify — just connect the repo and deploy.
Vercel Link: 

## Demo

Short screen recording included in the submission showing:
- Navigating between months
- Selecting a date range
- Writing and persisting notes
- Layout on mobile vs desktop