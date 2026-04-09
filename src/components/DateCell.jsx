import React from "react";

const DateCell = ({ day, isToday, isStart, isEnd, isInRange, isOtherMonth, isWeekend, onClick }) => {
  const base = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "1",
    fontSize: "13px",
    fontWeight: "500",
    cursor: isOtherMonth ? "default" : "pointer",
    borderRadius: "50%",
    transition: "all 0.15s ease",
    position: "relative",
    userSelect: "none",
  };

  let style = { ...base };

  if (isOtherMonth) {
    style.color = "#334155";
    style.pointerEvents = "none";
  } else if (isStart && isEnd) {
    style.background = "linear-gradient(135deg, #f97316, #ea580c)";
    style.color = "#fff";
    style.boxShadow = "0 4px 14px rgba(249,115,22,0.45)";
  } else if (isStart) {
    style.background = "linear-gradient(135deg, #f97316, #ea580c)";
    style.color = "#fff";
    style.boxShadow = "0 4px 14px rgba(249,115,22,0.45)";
    style.borderRadius = "50% 0 0 50%";
  } else if (isEnd) {
    style.background = "linear-gradient(135deg, #f97316, #ea580c)";
    style.color = "#fff";
    style.boxShadow = "0 4px 14px rgba(249,115,22,0.45)";
    style.borderRadius = "0 50% 50% 0";
  } else if (isInRange) {
    style.background = "rgba(249,115,22,0.12)";
    style.color = "#fb923c";
    style.borderRadius = "0";
  } else if (isToday) {
    style.color = "#f97316";
    style.fontWeight = "700";
  } else if (isWeekend) {
    style.color = "#94a3b8";
  } else {
    style.color = "#cbd5e1";
  }

  return (
    <div
      style={style}
      onClick={isOtherMonth ? undefined : onClick}
      onMouseEnter={e => {
        if (!isOtherMonth && !isStart && !isEnd && !isInRange) {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "#f97316";
        }
      }}
      onMouseLeave={e => {
        if (!isOtherMonth && !isStart && !isEnd && !isInRange) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = isToday ? "#f97316" : isWeekend ? "#94a3b8" : "#cbd5e1";
        }
      }}
    >
      {day}
      {isToday && !isStart && !isEnd && (
        <span style={{
          position: "absolute",
          bottom: "2px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: "#f97316",
        }} />
      )}
    </div>
  );
};

export default DateCell;