// month names used in hero + nav label
export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DAY_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// one photo per month, swaps out the hero image
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?w=800&q=80",
  "https://images.unsplash.com/photo-1490750967868-88df5691cc43?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80",
];

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// monday-first grid, so sunday (0) wraps to index 6
export function getMonthStartOffset(year, month) {
  const raw = new Date(year, month, 1).getDay();
  return raw === 0 ? 6 : raw - 1;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBetween(date, start, end) {
  if (!start || !end) return false;
  return date > start && date < end;
}

export function prettyDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function countDays(start, end) {
  return Math.round((end - start) / 86400000);
}

export function getNotesKey(year, month) {
  return `cal_notes_${year}_${month}`;
}