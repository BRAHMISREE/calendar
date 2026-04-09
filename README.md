# Interactive Calendar Component

A responsive and interactive calendar component built with React. The design is inspired by a physical wall calendar, combining a visual layout with practical functionality such as date range selection and note-taking.

## Features

* **Wall Calendar Layout**
  Includes a hero image section and a structured date grid to mimic a physical calendar layout.

* **Date Range Selection**
  Users can select a start date and an end date. The selected range is clearly highlighted, with intuitive handling of reverse selections.

* **Notes Section**
  Users can write notes for each month. Notes are automatically saved using localStorage and persist across page reloads.

* **Responsive Design**

  * Desktop: Side-by-side layout for calendar and notes
  * Mobile: Vertically stacked layout for better usability

## Tech Stack

* React 18 (Create React App)
* CSS Modules for styling
* localStorage for client-side persistence

## Project Structure

```
src/
├── components/
│   ├── Calendar.jsx
│   ├── Calendar.module.css
│   ├── DateCell.jsx
│   ├── DateCell.module.css
│   ├── Notes.jsx
│   └── Notes.module.css
├── utils/
│   └── dateUtils.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/calendar.git
cd calendar
npm install
npm start
```

The application will run at:

```
http://localhost:3000
```

## Implementation Details

* **Calendar Grid**
  The calendar is rendered as a fixed 6 × 7 grid (42 cells). This ensures consistent layout across months, including leading and trailing days from adjacent months.

* **Date Range Selection Logic**
  Managed using `rangeStart`, `rangeEnd`, and a control flag for selection flow. If a user selects an end date earlier than the start date, the values are automatically adjusted.

* **Notes Persistence**
  Notes are stored using localStorage with a month-specific key format (`cal_notes_YYYY_M`), ensuring data is scoped per month.

## Deployment

The project is deployed using GitHub Pages and can be accessed here:

https://your-username.github.io/calendar

The live version demonstrates all core features including date selection, notes persistence, and responsive layout.

## Demo

A short screen recording is included with the submission, demonstrating:

* Month navigation
* Date range selection
* Notes functionality
* Responsive behavior across screen sizes

Video link: https://drive.google.com/file/d/1ffVPv0w3N3YCK3meWduGAUoLx48DQZx-/view?usp=sharing

## Conclusion

This project demonstrates frontend development skills including component design, state management, responsive UI implementation, and attention to user experience.
