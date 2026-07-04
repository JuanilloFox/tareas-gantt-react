import React from "react";
import { getProgressPoint } from "../../../Auxiliares/auxiliar-bar";
import { BarDisplay } from "./bar-display";
import { BarDateHandle } from "./bar-date-handle";
import { BarProgressHandle } from "./bar-progress-handle";
import { TareaItemProps } from "../tarea-item";
import styles from "./bar.module.css";

export const Bar: React.FC<TareaItemProps> = ({
  tarea,
  isProgressChangeable,
  isDateChangeable,
  rtl,
  onEventStart,
  isSelected,
}) => {
  const progressPoint = getProgressPoint(
    +!rtl * tarea.anchoProgreso + tarea.progresoX,
    tarea.y,
    tarea.Alto
  );
  const handleHeight = tarea.Alto - 2;
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
        {isDateChangeable && (
          <g>
            {/* left */}
            <BarDateHandle
              x={tarea.x1 + 1}
              y={tarea.y + 1}
              width={tarea.handleWidth}
              height={handleHeight}
              barCornerRadius={tarea.barCornerRadius}
              onMouseDown={e => {
                onEventStart("inicio", tarea, e);
              }}
            />
            {/* right */}
            <BarDateHandle
              x={tarea.x2 - tarea.handleWidth - 1}
              y={tarea.y + 1}
              width={tarea.handleWidth}
              height={handleHeight}
              barCornerRadius={tarea.barCornerRadius}
              onMouseDown={e => {
                onEventStart("fin", tarea, e);
              }}
            />
          </g>
        )}
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
