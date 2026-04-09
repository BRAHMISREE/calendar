import React, { useState, useEffect } from "react";
import { noteStorageKey } from "../utils/dateUtils";

const Notes = ({ year, month, rangeStart, rangeEnd, formatDate, daysBetween }) => {
  const key = noteStorageKey(year, month);
  const [text, setText] = useState(() => localStorage.getItem(key) || "");

  useEffect(() => {
    setText(localStorage.getItem(key) || "");
  }, [key]);

  const handleChange = (e) => {
    setText(e.target.value);
    localStorage.setItem(key, e.target.value);
  };

  const handleClear = () => {
    setText("");
    localStorage.removeItem(key);
  };

  const hasBoth = rangeStart && rangeEnd;
  const diff = hasBoth ? daysBetween(rangeStart, rangeEnd) : 0;

  const s = {
    wrap: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      borderTop: "1px solid #1e293b",
    },
    wrapMobile: {
      display: "grid",
      gridTemplateColumns: "1fr",
      borderTop: "1px solid #1e293b",
    },
    notesPanel: {
      padding: "20px",
      borderRight: "1px solid #1e293b",
    },
    rangePanel: {
      padding: "20px",
    },
    label: {
      fontSize: "10px",
      fontWeight: "600",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#475569",
      display: "block",
      marginBottom: "12px",
    },
    textarea: {
      width: "100%",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid #1e293b",
      borderRadius: "10px",
      padding: "12px",
      fontSize: "13px",
      color: "#cbd5e1",
      fontFamily: "'Courier New', monospace",
      resize: "none",
      outline: "none",
      lineHeight: "1.6",
      minHeight: "90px",
      boxSizing: "border-box",
      caretColor: "#f97316",
    },
    hint: {
      fontSize: "11px",
      color: "#334155",
      marginTop: "6px",
    },
    clearBtn: {
      background: "none",
      border: "none",
      fontSize: "11px",
      color: "#475569",
      cursor: "pointer",
      padding: "0",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(249,115,22,0.12)",
      color: "#f97316",
      fontSize: "11px",
      fontWeight: "600",
      padding: "4px 10px",
      borderRadius: "6px",
      marginBottom: "12px",
    },
    bigNum: {
      fontSize: "40px",
      fontWeight: "800",
      color: "#f1f5f9",
      lineHeight: "1",
      marginBottom: "4px",
    },
    dateRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "4px",
    },
    dot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#f97316",
      flexShrink: "0",
    },
    dateText: {
      fontSize: "12px",
      color: "#64748b",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "12px 0",
      gap: "8px",
    },
    emptyText: {
      fontSize: "13px",
      color: "#334155",
    },
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div style={isMobile ? s.wrapMobile : s.wrap}>
      {/* Notes */}
      <div style={isMobile ? { ...s.notesPanel, borderRight: "none", borderBottom: "1px solid #1e293b" } : s.notesPanel}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={s.label}>Monthly Notes</span>
          {text && (
            <button style={s.clearBtn} onClick={handleClear}>Clear</button>
          )}
        </div>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Write anything for this month..."
          style={s.textarea}
          onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.4)"}
          onBlur={e => e.target.style.borderColor = "#1e293b"}
        />
        <p style={s.hint}>
          {text.length > 0 ? `${text.length} chars · ` : ""}Auto-saved to browser
        </p>
      </div>

      {/* Range info */}
      <div style={s.rangePanel}>
        <span style={s.label}>Selected Range</span>

        {!rangeStart ? (
          <div style={s.emptyState}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p style={s.emptyText}>Click a date to start</p>
          </div>
        ) : !rangeEnd ? (
          <>
            <div style={s.badge}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f97316", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              Start date set
            </div>
            <div style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0", marginBottom: "6px" }}>
              {formatDate(rangeStart)}
            </div>
            <p style={{ fontSize: "12px", color: "#475569" }}>Now click an end date →</p>
          </>
        ) : (
          <>
            <div style={s.badge}>Range selected</div>
            <div style={s.bigNum}>{diff}</div>
            <div style={{ fontSize: "12px", color: "#475569", marginBottom: "14px" }}>
              {diff === 1 ? "day" : "days"} selected
            </div>
            <div style={s.dateRow}>
              <span style={s.dot} />
              <span style={s.dateText}>{formatDate(rangeStart)}</span>
            </div>
            <div style={s.dateRow}>
              <span style={s.dot} />
              <span style={s.dateText}>{formatDate(rangeEnd)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;