import React from "react";
import { TareaItemProps } from "../tarea-item";
import styles from "./hito.module.css";

export const Hito: React.FC<TareaItemProps> = ({
  tarea,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  const transform = `rotate(45 ${tarea.x1 + tarea.Alto * 0.356}
    ${tarea.y + tarea.Alto * 0.85})`;
  const getBarColor = () => {
    return isSelected
      ? tarea.styles.backgroundSelectedColor
      : tarea.styles.backgroundColor;
  };

  return (
    <g tabIndex={0} className={styles.hitoWrapper}>
      <rect
        fill={getBarColor()}
        x={tarea.x1}
        width={tarea.Alto}
        y={tarea.y}
        height={tarea.Alto}
        rx={tarea.barCornerRadius}
        ry={tarea.barCornerRadius}
        transform={transform}
        className={styles.hitoBackground}
        onMouseDown={e => {
          isDateChangeable && onEventStart("mover", tarea, e);
        }}
      />
    </g>
  );
};
