/** Circular ButtonCell – UI-only component (circular interactive cell for iSenses grids) */

function ButtonCell({
  idx,
  size = 166,
  borderPx = 7,
  color = null,          // "green" | "red" | "orange" | null
  uiState = "none",      // "none" | "highlight" | "wrong" | "cooldown"
  showSuccess = false,   // zobrazí logo S_
  disabled = false,
  onClick,
}) {
  const COLORS = {
    green:  "#00A499",
    red:    "#D50032",
    orange: "#F2A900",
    neutral:"#FFFFFF",
  };

  const fill =
    color === "green"  ? COLORS.green  :
    color === "red"    ? COLORS.red    :
    color === "orange" ? COLORS.orange :
                         COLORS.neutral;

  let boxShadow = "none";
  let opacity = 1;

  switch (uiState) {
    case "highlight":
      boxShadow = "0 0 14px rgba(0, 164, 153, 0.7)";
      break;
    case "wrong":
      boxShadow = "0 0 14px rgba(213, 0, 50, 0.7)";
      break;
    case "cooldown":
      opacity = 0.6;
      break;
    default:
      break;
  }

  const handleClick = (ev) => {
    if (disabled) return;
    onClick?.(idx, ev);
  };

  return (
    <button
      id={`cell-${idx}`}
      onClick={handleClick}
      disabled={disabled}
      style={{
        position: "relative",
        width: size,
        height: size,
        background: fill,
        border: `${borderPx}px solid #6CACE4`,
        borderRadius: "50%",
        aspectRatio: "1 / 1",
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
        transition:
          "background-color 150ms, border-color 150ms, box-shadow 150ms, opacity 150ms",
        padding: 0,
        opacity,
        boxShadow,
        overflow: "hidden",
      }}
      aria-label={`circle cell ${idx}`}
    >
      {showSuccess && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: 900,
            fontSize: size * 0.45,
            color: "#000",
            textShadow: "0 0 8px rgba(255,255,255,0.7)",
            pointerEvents: "none",
          }}
        >
          S_
        </div>
      )}
    </button>
  );
}

export default ButtonCell;
