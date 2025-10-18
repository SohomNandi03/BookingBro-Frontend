import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    onDateChange(null, null);
    onFilterChange(null, null);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff9f0, #fff1cc)",
        padding: "2.5rem",
        borderRadius: "1.25rem",
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "680px",
        margin: "2rem auto",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h5
        className="mb-4"
        style={{
          fontWeight: "700",
          color: "#b8860b",
          textAlign: "center",
          fontSize: "1.4rem",
          letterSpacing: "0.5px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Filter Bookings by Date
      </h5>

      <div
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        }}
      >
        <DateRangePicker
          ranges={[dateRange]}
          onChange={handleSelect}
          className="mb-3"
          rangeColors={["#ffda44"]}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
        />
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn"
          onClick={handleClearFilter}
          style={{
            backgroundColor: "#ffda44",
            color: "#333",
            fontWeight: "600",
            borderRadius: "0.75rem",
            padding: "0.6rem 2rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            fontSize: "0.95rem",
            letterSpacing: "0.5px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6c200")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffda44")}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default DateSlider;
