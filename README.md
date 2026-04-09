# Interactive Calendar Component

This project is a responsive and interactive calendar component built using React. It is designed to resemble a wall calendar layout while providing useful functionality such as date range selection and note-taking.

## Overview

The goal of this project is to translate a static calendar design into a functional and user-friendly web component. The application focuses on clean UI, intuitive interactions, and responsiveness across different devices.

## Features

* **Wall Calendar Layout**
  A structured layout inspired by a physical wall calendar, combining a visual section with a date grid.

* **Date Range Selection**
  Users can select a start date and an end date directly from the calendar. The selected range is clearly highlighted.

* **Notes Section**
  Users can write notes associated with the calendar. Notes are stored locally in the browser using localStorage.

* **Responsive Design**
  The layout adapts to different screen sizes:

  * Desktop view with a structured layout
  * Mobile view with stacked components for better usability

## Tech Stack

* React (Create React App)
* JavaScript (ES6+)
* Tailwind CSS (for styling)

## Project Structure

```
src/
├── components/
│   ├── Calendar.jsx
│   ├── DateCell.jsx
│   ├── Notes.jsx
├── utils/
│   └── dateUtils.js
├── App.js
├── index.js
```

## Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```
git clone https://github.com/your-username/calendar.git
```

### 2. Navigate to the Project Folder

```
cd calendar
```

### 3. Install Dependencies

```
npm install
```

### 4. Start the Development Server

```
npm start
```

The application will run on:

```
http://localhost:3000
```

## How It Works

* The calendar grid is generated dynamically for the current month.
* Date selection is managed using React state:

  * First click selects the start date
  * Second click selects the end date
  * Dates in between are highlighted
* Notes are stored using localStorage so they persist even after refreshing the page.
* The layout is styled using Tailwind CSS to ensure consistency and responsiveness.

## Deployment

The project can be deployed using platforms such as Vercel or Netlify.

## Demo

A short video demonstration is included in the submission, showcasing:

* Date range selection
* Notes functionality
* Responsive behavior across devices

## Conclusion

This project demonstrates frontend development skills including component design, state management, responsive layout implementation, and attention to user experience.
