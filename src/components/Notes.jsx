import React, { useState, useEffect } from "react";
import styles from "./Notes.module.css";
import { getNotesKey, prettyDate, countDays } from "../utils/dateUtils";

const Notes = ({ year, month, rangeStart, rangeEnd }) => {
  const storageKey = getNotesKey(year, month);
  const [text, setText] = useState(() => localStorage.getItem(storageKey) || "");

  // reload notes when month changes
  useEffect(() => {
    setText(localStorage.getItem(storageKey) || "");
  }, [storageKey]);

  const handleChange = (e) => {
    setText(e.target.value);
    localStorage.setItem(storageKey, e.target.value);
  };

  const diff = rangeStart && rangeEnd ? countDays(rangeStart, rangeEnd) : 0;

  return (
    <div className={styles.bottom}>
      <div className={styles.notesPanel}>
        <div className={styles.labelRow}>
          <span className={styles.panelLabel}>Monthly Notes</span>
          {text && (
            <button
              className={styles.clearBtn}
              onClick={() => {
                setText("");
                localStorage.removeItem(storageKey);
              }}
            >
              clear
            </button>
          )}
        </div>

        <textarea
          className={styles.textarea}
          value={text}
          onChange={handleChange}
          placeholder="anything for this month..."
          rows={4}
        />

        {text.length > 0 && (
          <p className={styles.charCount}>{text.length} chars</p>
        )}
      </div>

      <div className={styles.rangePanel}>
        <span className={styles.panelLabel}>Selected Range</span>

        {!rangeStart && (
          <p className={styles.emptyHint}>click a date to start</p>
        )}

        {rangeStart && !rangeEnd && (
          <>
            <div className={styles.badge}>
              <span className={styles.pulseDot} />
              selecting...
            </div>
            <p className={styles.startDateText}>{prettyDate(rangeStart)}</p>
            <p className={styles.subText}>now pick an end date</p>
          </>
        )}

        {rangeStart && rangeEnd && (
          <>
            <div className={styles.badge}>done</div>
            <div className={styles.bigNumber}>{diff}</div>
            <p className={styles.daysLabel}>{diff === 1 ? "day" : "days"}</p>
            <div className={styles.dateList}>
              <div className={styles.dateListItem}>
                <span className={styles.dot} />
                {prettyDate(rangeStart)}
              </div>
              <div className={styles.dateListItem}>
                <span className={styles.dot} />
                {prettyDate(rangeEnd)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;