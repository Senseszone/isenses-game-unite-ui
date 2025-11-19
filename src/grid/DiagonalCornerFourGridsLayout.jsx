// src/grid/DiagonalCornerFourGridsLayout.jsx
import React from "react";
import ButtonCell from "../ui/ButtonCell";              // square 166×166
import InstructionCueButton from "../ui/InstructionCueButton"; // 2×166 instruction button

const CELL_SIZE = 166;
const GRID_ROWS = 5;
const GRID_COLS = 5;
const GAP_PX = 12;

const GRID_WIDTH = GRID_COLS * CELL_SIZE + (GRID_COLS - 1) * GAP_PX;
const GRID_HEIGHT = GRID_ROWS * CELL_SIZE + (GRID_ROWS - 1) * GAP_PX;

/**
 * UI-only layout:
 * - uprostřed InstructionCueButton
 * - 4× 5×5 grid v rozích herní plochy (co nejdál od středu)
 *
 * grids: pole délky 4, každá položka je pole max 25 buněk:
 *   grids[0] = top-left grid (5×5)
 *   grids[1] = top-right grid
 *   grids[2] = bottom-left grid
 *   grids[3] = bottom-right grid
 * Každá buňka: { color, uiState, showSuccess, disabled }
 */
function DiagonalCornerFourGridsLayout({
  cueProps = {},           // props pro InstructionCueButton
  grids = [[], [], [], []],
  onCellClick,             // (globalIdx, event) => void
  disabled = false,
  gapPx = GAP_PX,
  cornerMarginPx = 32,     // odsazení gridu od úplného rohu
}) {
  const renderGrid = (gridIndex, corner) => {
    const cells = grids[gridIndex] || [];
    const baseIdx = gridIndex * GRID_ROWS * GRID_COLS; // 0, 25, 50, 75

    const commonStyle = {
      position: "absolute",
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      display: "grid",
      gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
      gridAutoRows: `${CELL_SIZE}px`,
      columnGap: gapPx,
      rowGap: gapPx,
    };

    const cornerStyle =
      corner === "top-left"
        ? { top: cornerMarginPx, left: cornerMarginPx }
        : corner === "top-right"
        ? { top: cornerMarginPx, right: cornerMarginPx }
        : corner === "bottom-left"
        ? { bottom: cornerMarginPx, left: cornerMarginPx }
        : { bottom: cornerMarginPx, right: cornerMarginPx }; // bottom-right

    return (
      <div key={corner} style={{ ...commonStyle, ...cornerStyle }}>
        {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
          const globalIdx = baseIdx + i + 1; // 1–100
          const cfg = cells[i] || {};
          return (
            <ButtonCell
              key={globalIdx}
              idx={globalIdx}
              size={CELL_SIZE}
              color={cfg.color ?? null}
              uiState={cfg.uiState ?? "none"}
              showSuccess={cfg.showSuccess ?? false}
              disabled={disabled || cfg.disabled}
              onClick={onCellClick}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* centrální instrukční tlačítko */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <InstructionCueButton {...cueProps} />
      </div>

      {/* 4 gridy co nejdál od středu = v rozích herní plochy */}
      {renderGrid(0, "top-left")}
      {renderGrid(1, "top-right")}
      {renderGrid(2, "bottom-left")}
      {renderGrid(3, "bottom-right")}
    </div>
  );
}

export default DiagonalCornerFourGridsLayout;
