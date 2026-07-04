import React from "react";
import { TareaItemProps } from "../tarea-item";
import styles from "./proyecto.module.css";

export const Proyecto: React.FC<TareaItemProps> = ({ tarea, isSelected }) => {
  const barColor = isSelected
    ? tarea.styles.backgroundSelectedColor
    : tarea.styles.backgroundColor;
  const processColor = isSelected
    ? tarea.styles.progressSelectedColor
    : tarea.styles.progressColor;
  const anchoProyecto = tarea.x2 - tarea.x1;

  const proyectoLeftTriangle = [
    tarea.x1,
    tarea.y + tarea.Alto / 2 - 1,
    tarea.x1,
    tarea.y + tarea.Alto,
    tarea.x1 + 15,
    tarea.y + tarea.Alto / 2 - 1,
  ].join(",");
  const proyectoRightTriangle = [
    tarea.x2,
    tarea.y + tarea.Alto / 2 - 1,
    tarea.x2,
    tarea.y + tarea.Alto,
    tarea.x2 - 15,
    tarea.y + tarea.Alto / 2 - 1,
  ].join(",");

  return (
    <g tabIndex={0} className={styles.proyectoWrapper}>
      <rect
        fill={barColor}
        x={tarea.x1}
        width={anchoProyecto}
        y={tarea.y}
        height={tarea.Alto}
        rx={tarea.barCornerRadius}
        ry={tarea.barCornerRadius}
        className={styles.proyectoBackground}
      />
      <rect
        x={tarea.progresoX}
        width={tarea.anchoProgreso}
        y={tarea.y}
        height={tarea.Alto}
        ry={tarea.barCornerRadius}
        rx={tarea.barCornerRadius}
        fill={processColor}
      />
      <rect
        fill={barColor}
        x={tarea.x1}
        width={anchoProyecto}
        y={tarea.y}
        height={tarea.Alto / 2}
        rx={tarea.barCornerRadius}
        ry={tarea.barCornerRadius}
        className={styles.proyectoTop}
      />
      <polygon
        className={styles.proyectoTop}
        points={proyectoLeftTriangle}
        fill={barColor}
      />
      <polygon
        className={styles.proyectoTop}
        points={proyectoRightTriangle}
        fill={barColor}
      />
    </g>
  );
};
