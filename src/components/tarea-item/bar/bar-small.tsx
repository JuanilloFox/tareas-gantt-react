import React from "react";
import { getProgressPoint } from "../../../Auxiliares/auxiliar-bar";
import { BarDisplay } from "./bar-display";
import { BarProgressHandle } from "./bar-progress-handle";
import { TareaItemProps } from "../tarea-item";
import styles from "./bar.module.css";

export const BarSmall: React.FC<TareaItemProps> = ({
  tarea,
  isProgressChangeable,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  const progressPoint = getProgressPoint(
    tarea.anchoProgreso + tarea.x1,
    tarea.y,
    tarea.Alto
  );
  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <BarDisplay
        x={tarea.x1}
        y={tarea.y}
        width={tarea.x2 - tarea.x1}
        height={tarea.Alto}
        progressX={tarea.progresoX}
        progressWidth={tarea.anchoProgreso}
        barCornerRadius={tarea.barCornerRadius}
        styles={tarea.styles}
        isSelected={isSelected}
        onMouseDown={e => {
          isDateChangeable && onEventStart("mover", tarea, e);
        }}
      />
      <g className="handleGroup">
        {isProgressChangeable && (
          <BarProgressHandle
            progressPoint={progressPoint}
            onMouseDown={e => {
              onEventStart("progreso", tarea, e);
            }}
          />
        )}
      </g>
    </g>
  );
};
