import React from "react";
import styles from "./DateCell.module.css";

// single day cell — handles all the visual states for range selection
const DateCell = ({ day, isToday, isStart, isEnd, inRange, isOtherMonth, isWeekend, onClick }) => {
  const classNames = [
    styles.cell,
    isOtherMonth && styles.otherMonth,
    !isOtherMonth && isWeekend && styles.weekend,
    !isOtherMonth && isToday && styles.today,
    inRange && styles.inRange,
    isStart && styles.rangeStart,
    isEnd && styles.rangeEnd,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} onClick={onClick}>
      {day}
    </div>
  );
};

export default DateCell;