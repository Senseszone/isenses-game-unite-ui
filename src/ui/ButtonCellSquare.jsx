/** UI-only tlačítko/buňka pro grid iSenses hry (viz popis výše) */
function ButtonCell({
  idx,
  size = 166,
  borderPx = 7,
  radius = 10,
  color = null,          // "green" | "red" | "orange" | null
  uiState = "none",      // "none" | "highlight" | "wrong" | "cooldown"
  showSuccess = false,   // true = zobraz logo S_ jako feedback
  disabled = false,
  onClick,
}) {
  const COLORS = {
    green: "#00A499",
    red: "#D50032",
    orange: "#F2A900",
    neutral: "#FFFFFF",
  };

  const baseFill =
    color === "green"  ? COLORS.green  :
    color === "red"    ? COLORS.red    :
    color === "orange" ? COLORS.orange :
                         COLORS.neutral;

  const baseBorderColor = "#6CACE4";

  let borderColor = baseBorderColor;
  let boxShadow = "none";
  let opacity = 1;

  switch (uiState) {
    case "highlight":
      boxShadow = "0 0 12px rgba(0, 164, 153, 0.7)";
      break;
    case "wrong":
      boxShadow = "0 0 12px rgba(213, 0, 50, 0.7)";
      break;
    case "cooldown":
      opacity = 0.6;
      break;
    case "none":
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
        background: baseFill,
        border: `${borderPx}px solid ${borderColor}`,
        borderRadius: radius,
        aspectRatio: "1 / 1",
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
        transition:
          "background-color 150ms, border-color 150ms, box-shadow 150ms, opacity 150ms",
        padding: 0,
        boxShadow,
        opacity,
        overflow: "hidden",
      }}
      aria-label={`grid cell ${idx}`}
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
            fontWeight: 800,
            fontSize: size * 0.4,
            color: "#000000",
            textShadow: "0 0 6px rgba(255,255,255,0.8)",
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
