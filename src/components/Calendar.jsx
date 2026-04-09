import React, { useState, useCallback } from "react";
import styles from "./Calendar.module.css";
import DateCell from "./DateCell";
import Notes from "./Notes";
import {
  MONTHS,
  DAY_LABELS,
  HERO_IMAGES,
  getDaysInMonth,
  getMonthStartOffset,
  isSameDay,
  isBetween,
} from "../utils/dateUtils";

export default function Calendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  // true = waiting for second click
  const [pickingEnd, setPickingEnd] = useState(false);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  function goToToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  const handleDayClick = useCallback((day) => {
    const clicked = new Date(year, month, day);

    if (!pickingEnd) {
      setRangeStart(clicked);
      setRangeEnd(null);
      setPickingEnd(true);
      return;
    }

    // swap if they clicked backwards
    if (clicked < rangeStart) {
      setRangeEnd(rangeStart);
      setRangeStart(clicked);
    } else {
      setRangeEnd(clicked);
    }
    setPickingEnd(false);
  }, [pickingEnd, rangeStart, year, month]);

  function clearRange() {
    setRangeStart(null);
    setRangeEnd(null);
    setPickingEnd(false);
  }

  // build the 42-cell grid (6 rows × 7 cols)
  const offset = getMonthStartOffset(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const cells = [];

  // leading grey cells from prev month
  for (let i = 0; i < offset; i++) {
    cells.push({ day: prevMonthDays - offset + 1 + i, other: true });
  }
  // actual days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, other: false });
  }
  // trailing grey cells
  let trailing = 1;
  while (cells.length < 42) {
    cells.push({ day: trailing++, other: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.topBar}>
          <div>
            <div className={styles.logo}>cal<span>.</span></div>
            <div className={styles.logoSub}>interactive calendar</div>
          </div>
          <div className={styles.actions}>
            {rangeStart && (
              <button className={styles.ghostBtn} onClick={clearRange}>
                clear
              </button>
            )}
            <button className={styles.ghostBtn} onClick={goToToday}>
              today
            </button>
          </div>
        </div>

        <div className={styles.card}>
          {/* spiral rings */}
          <div className={styles.rings}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={styles.ringDot} />
            ))}
          </div>

          <div className={styles.calBody}>
            {/* hero photo */}
            <div className={styles.hero}>
              <img
                src={HERO_IMAGES[month]}
                alt={MONTHS[month]}
                className={styles.heroImg}
              />
              <div className={styles.heroGradient} />
              <div className={styles.heroText}>
                <div className={styles.heroYear}>{year}</div>
                <div className={styles.heroMonth}>{MONTHS[month]}</div>
              </div>
            </div>

            {/* calendar grid */}
            <div className={styles.gridPanel}>
              <div className={styles.nav}>
                <button className={styles.navBtn} onClick={prevMonth}>←</button>
                <span className={styles.navLabel}>
                  {MONTHS[month].slice(0, 3).toUpperCase()} {year}
                </span>
                <button className={styles.navBtn} onClick={nextMonth}>→</button>
              </div>

              <div className={styles.gridWrap}>
                <div className={styles.dayHeaders}>
                  {DAY_LABELS.map((label, i) => (
                    <div
                      key={label}
                      className={`${styles.dayHdr} ${i >= 5 ? styles.weekend : ""}`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div className={styles.grid}>
                  {cells.map((cell, idx) => {
                    const date = !cell.other ? new Date(year, month, cell.day) : null;
                    const dow = date ? date.getDay() : 0;

                    return (
                      <DateCell
                        key={idx}
                        day={cell.day}
                        isOtherMonth={cell.other}
                        isToday={date ? isSameDay(date, today) : false}
                        isStart={date ? isSameDay(date, rangeStart) : false}
                        isEnd={date ? isSameDay(date, rangeEnd) : false}
                        inRange={date ? isBetween(date, rangeStart, rangeEnd) : false}
                        isWeekend={dow === 0 || dow === 6}
                        onClick={cell.other ? undefined : () => handleDayClick(cell.day)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Notes
            year={year}
            month={month}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
        </div>

        <p className={styles.hint}>
          {pickingEnd ? "now click an end date" : "click any date to start selecting"}
        </p>

      </div>
    </div>
  );
}