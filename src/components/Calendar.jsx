import React, { useState, useCallback, useEffect } from "react";
import DateCell from "./DateCell";
import Notes from "./Notes";
import {
  MONTHS, DAYS_SHORT, MONTH_IMAGES,
  getDaysInMonth, getFirstDayOfMonth,
  isSameDay, isInRange, formatDate, daysBetween,
} from "../utils/dateUtils";

const S = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "32px 16px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    backgroundImage: "radial-gradient(ellipse at 15% 25%, rgba(249,115,22,0.07) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(249,115,22,0.04) 0%, transparent 55%)",
  },
  container: {
    width: "100%",
    maxWidth: "780px",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: "-0.03em",
  },
  logoAccent: {
    color: "#f97316",
  },
  logoSub: {
    fontSize: "11px",
    color: "#334155",
    marginTop: "2px",
  },
  btnGroup: {
    display: "flex",
    gap: "8px",
  },
  outlineBtn: {
    background: "none",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "12px",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(249,115,22,0.05)",
  },
  ringStrip: {
    height: "14px",
    background: "#070f1f",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    gap: "14px",
  },
  ringDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "1.5px solid #1e293b",
    background: "#0f172a",
    flexShrink: "0",
  },
  topPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  topPanelMobile: {
    display: "grid",
    gridTemplateColumns: "1fr",
  },
  heroWrap: {
    position: "relative",
    minHeight: "240px",
    overflow: "hidden",
    background: "#0a1628",
  },
  heroImg: {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: "0.8",
  },
  heroOverlay: {
    position: "absolute",
    inset: "0",
    background: "linear-gradient(160deg, rgba(2,6,23,0.1) 0%, rgba(2,6,23,0.7) 100%)",
  },
  heroText: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "20px",
  },
  heroYear: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#f97316",
    marginBottom: "4px",
  },
  heroMonth: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "-0.02em",
    lineHeight: "1",
  },
  rightPanel: {
    background: "#0f172a",
    borderLeft: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
  },
  rightPanelMobile: {
    background: "#0f172a",
    borderTop: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
  },
  navBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderBottom: "1px solid #1e293b",
  },
  navBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "7px",
    border: "1px solid #1e293b",
    background: "none",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  navLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#e2e8f0",
    letterSpacing: "0.05em",
  },
  gridWrap: {
    padding: "10px 12px 12px",
    flex: "1",
  },
  dayHeaders: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: "4px",
  },
  dayHdr: (isWknd) => ({
    textAlign: "center",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    padding: "4px 0",
    color: isWknd ? "#f97316" : "#334155",
    textTransform: "uppercase",
  }),
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "1px",
  },
  statusBar: {
    textAlign: "center",
    fontSize: "11px",
    color: "#334155",
    marginTop: "14px",
    letterSpacing: "0.04em",
  },
};

export default function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const handleDayClick = useCallback((day) => {
    const clicked = new Date(year, month, day);
    if (!selecting || !rangeStart) {
      setRangeStart(clicked);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      if (clicked < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(clicked);
      } else {
        setRangeEnd(clicked);
      }
      setSelecting(false);
    }
  }, [selecting, rangeStart, year, month]);

  const clearRange = () => { setRangeStart(null); setRangeEnd(null); setSelecting(false); };

  // Build 42-cell grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, other: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, other: false });
  }
  let trailingDay = 1;
  while (cells.length < 42) {
    cells.push({ day: trailingDay++, other: true });
  }

  return (
    <div style={S.page}>
      <div style={S.container}>
        {/* Header */}
        <div style={S.topBar}>
          <div>
            <div style={S.logo}>
              cal<span style={S.logoAccent}>.</span>
            </div>
            <div style={S.logoSub}>Interactive Calendar</div>
          </div>
          <div style={S.btnGroup}>
            {(rangeStart || rangeEnd) && (
              <button
                style={S.outlineBtn}
                onClick={clearRange}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(249,115,22,0.4)"; e.target.style.color = "#f97316"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#1e293b"; e.target.style.color = "#64748b"; }}
              >
                Clear range
              </button>
            )}
            <button
              style={S.outlineBtn}
              onClick={() => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(249,115,22,0.4)"; e.target.style.color = "#f97316"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#1e293b"; e.target.style.color = "#64748b"; }}
            >
              Today
            </button>
          </div>
        </div>

        {/* Card */}
        <div style={S.card}>
          {/* Ring strip */}
          <div style={S.ringStrip}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} style={S.ringDot} />
            ))}
          </div>

          {/* Hero + Grid */}
          <div style={isMobile ? S.topPanelMobile : S.topPanel}>
            {/* Hero */}
            <div style={{ ...S.heroWrap, minHeight: isMobile ? "180px" : "240px" }}>
              <img src={MONTH_IMAGES[month]} alt={MONTHS[month]} style={S.heroImg} />
              <div style={S.heroOverlay} />
              <div style={S.heroText}>
                <div style={S.heroYear}>{year}</div>
                <div style={S.heroMonth}>{MONTHS[month]}</div>
              </div>
            </div>

            {/* Grid panel */}
            <div style={isMobile ? S.rightPanelMobile : S.rightPanel}>
              {/* Nav */}
              <div style={S.navBar}>
                <button
                  style={S.navBtn}
                  onClick={() => setViewDate(new Date(year, month - 1, 1))}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)"; e.currentTarget.style.color = "#f97316"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
                >
                  ←
                </button>
                <span style={S.navLabel}>{MONTHS[month].slice(0, 3).toUpperCase()} {year}</span>
                <button
                  style={S.navBtn}
                  onClick={() => setViewDate(new Date(year, month + 1, 1))}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)"; e.currentTarget.style.color = "#f97316"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
                >
                  →
                </button>
              </div>

              {/* Day headers */}
              <div style={S.gridWrap}>
                <div style={S.dayHeaders}>
                  {DAYS_SHORT.map((d, i) => (
                    <div key={d} style={S.dayHdr(i >= 5)}>{d}</div>
                  ))}
                </div>

                {/* Cells */}
                <div style={S.daysGrid}>
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
                        isInRange={date ? isInRange(date, rangeStart, rangeEnd) : false}
                        isWeekend={dow === 0 || dow === 6}
                        onClick={() => handleDayClick(cell.day)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Notes + Range */}
          <Notes
            year={year}
            month={month}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            formatDate={formatDate}
            daysBetween={daysBetween}
          />
        </div>

        <div style={S.statusBar}>
          {selecting
            ? "🟠  Start date set — click an end date on the grid"
            : "Click any date to begin a selection"}
        </div>
      </div>
    </div>
  );
}