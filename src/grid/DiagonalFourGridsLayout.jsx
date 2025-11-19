// src/grid/DiagonalFourGridsLayout.jsx
import React from "react";
import ButtonCell from "../ui/ButtonCell";              // square 166×166
import InstructionCueButton from "../ui/InstructionCueButton"; // 2×166 instruktční tlačítko

const CELL_SIZE = 166;
const GRID_ROWS = 5;
const GRID_COLS = 5;
const GAP_PX = 12;

const GRID_WIDTH = GRID_COLS * CELL_SIZE + (GRID_COLS - 1) * GAP_PX;
const GRID_HEIGHT = GRID_ROWS * CELL_SIZE + (GRID_ROWS - 1) * GAP_PX;

// vzdálenost od středu k nejbližšímu rohu gridu po diagonále
const DIAGONAL_OFFSET = 3 * CELL_SIZE;

/**
 * UI-only layout:
 * - uprostřed InstructionCueButton
 * - 4× 5×5 grid (TL, TR, BL, BR)
 * - nejbližší roh každého gridu leží na diagonále ve vzdálenosti 3×166 px od středu
 *
 * grids: pole délky 4, každá položka je pole 25 buněk:
 *   grids[0] = top-left grid (5×5)
 *   grids[1] = top-right grid
 *   grids[2] = bottom-left grid
 *   grids[3] = bottom-right grid
 * Každá buňka: { color, uiState, showSuccess, disabled }
 */
function DiagonalFourGridsLayout({
  cueProps = {},           // props pro InstructionCueButton
  grids = [[], [], [], []],
  onCellClick,             // (globalIdx, event) => void
  disabled = false,
}) {
  const renderGrid = (gridIndex, translateX, translateY) => {
    const cells = grids[gridIndex] || [];
    const baseIdx = gridIndex * GRID_ROWS * GRID_COLS; // 0, 25, 50, 75

    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(${translateX}px, ${translateY}px)`,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
          gridAutoRows: `${CELL_SIZE}px`,
          columnGap: GAP_PX,
          rowGap: GAP_PX,
        }}
      >
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

  // výpočet posunů gridů od středu (viz analýza)
  const d = DIAGONAL_OFFSET;
  const W = GRID_WIDTH;
  const H = GRID_HEIGHT;

  const tlTranslate = { x: -(d + W), y: -(d + H) }; // top-left grid (nejbližší roh = bottom-right)
  const trTranslate = { x: d,        y: -(d + H) }; // top-right (nejbližší roh = bottom-left)
  const blTranslate = { x: -(d + W), y: d };        // bottom-left (nejbližší roh = top-right)
  const brTranslate = { x: d,        y: d };        // bottom-right (nejbližší roh = top-left)

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

      {/* 4 diagonální gridy kolem středu */}
      {renderGrid(0, tlTranslate.x, tlTranslate.y)}
      {renderGrid(1, trTranslate.x, trTranslate.y)}
      {renderGrid(2, blTranslate.x, blTranslate.y)}
      {renderGrid(3, brTranslate.x, brTranslate.y)}
    </div>
  );
}

export default DiagonalFourGridsLayout;
