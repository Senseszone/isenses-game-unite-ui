// src/layout/GameContainer4K.jsx
/**
 * GameContainer4K
 * Standardní 4K kontejner pro všechny iSenses hry.
 *
 * Rozměry:
 * - Scéna: 3840×2160 px
 * - Herní pole: 3520×1840 px
 * - Okraje: 160 px
 *
 * Účel:
 * - jednotný vzhled a struktura UI
 * - bez herní logiky, pouze vizuální rámec
 * - children = layout hry (grid, random, tlačítka)
 *
 * Použití:
 * <GameContainer4K title="Název" timeLeftSec={30}>
 *    {layout}
 * </GameContainer4K>
 */

import React from "react";

export const SCREEN_W = 3840;
export const SCREEN_H = 2160;
export const MARGIN = 160;
export const PLAY_W = SCREEN_W - 2 * MARGIN; // 3520
export const PLAY_H = SCREEN_H - 2 * MARGIN; // 1840

export default function GameContainer4K({
  title = "",
  timeLeftSec = 0,
  children,
}) {
  return (
    <div
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        background: "#1A4E8A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* horní okraj */}
      <div style={{ height: MARGIN }} />

      {/* horní lišta */}
      <div
        style={{
          width: PLAY_W,
          height: MARGIN,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 600 }}>
          {Math.max(0, Math.floor(timeLeftSec))}s
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            textAlign: "center",
            flex: 1,
          }}
        >
          {title}
        </div>
        <div style={{ width: 240 }} />
      </div>

      {/* herní plocha – sem vkládáš grid/layout */}
      <div
        style={{
          width: PLAY_W,
          height: PLAY_H,
          background: "#0D2B55",
          border: "8px solid #6CACE4",
          borderRadius: 20,
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {typeof children === "function"
          ? children({ width: PLAY_W, height: PLAY_H })
          : children}
      </div>

      {/* dolní okraj */}
      <div style={{ height: MARGIN }} />
    </div>
  );
}
