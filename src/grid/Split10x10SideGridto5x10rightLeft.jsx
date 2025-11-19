// src/grid/Split10x10SideGrid.jsx
import React from "react";
import ButtonCell from "../ui/ButtonCell"; // square varianta 166×166

const ROWS = 10;
const COLS_PER_SIDE = 5;
const TOTAL_CELLS = ROWS * COLS_PER_SIDE * 2; // 100
const CELL_SIZE = 166;

function Split10x10SideGrid({
  cells = [],          // volitelné: [ { color, uiState, showSuccess, disabled }, ... ] pro idx 1–100
  onCellClick,         // (idx, event) => void
  disabled = false,
  gapPx = 12,          // mezery uvnitř gridů
}) {
  const leftIndices = Array.from({ length: ROWS * COLS_PER_SIDE }, (_, i) => i + 1);          // 1–50
  const rightIndices = Array.from({ length: ROWS * COLS_PER_SIDE }, (_, i) => i + 1 + 50);   // 51–100

  const renderCell = (idx) => {
    const cfg = cells[idx - 1] || {};
    return (
      <ButtonCell
        key={idx}
        idx={idx}
        size={CELL_SIZE}
        color={cfg.color ?? null}
        uiState={cfg.uiState ?? "none"}
        showSuccess={cfg.showSuccess ?? false}
        disabled={disabled || cfg.disabled}
        onClick={onCellClick}
      />
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between", // grid vlevo a vpravo, mezera uprostřed
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Levý 5×10 blok */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS_PER_SIDE}, ${CELL_SIZE}px)`,
          gridAutoRows: `${CELL_SIZE}px`,
          columnGap: gapPx,
          rowGap: gapPx,
        }}
      >
        {leftIndices.map(renderCell)}
      </div>

      {/* Pravý 5×10 blok */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS_PER_SIDE}, ${CELL_SIZE}px)`,
          gridAutoRows: `${CELL_SIZE}px`,
          columnGap: gapPx,
          rowGap: gapPx,
        }}
      >
        {rightIndices.map(renderCell)}
      </div>
    </div>
  );
}

export default Split10x10SideGrid;
