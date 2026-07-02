import React, { useMemo } from "react";
import styles from "./lista-tareas-table.module.css";
import { Task } from "../../types/public-types";

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface TaskListTableProps {
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}

export const TaskListTableDefault: React.FC<TaskListTableProps> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  selectedTaskId,
  setSelectedTask,
  onExpanderClick,
}) => {
  // Intl.DateTimeFormat es la forma estándar y nativa más rápida de formatear fechas
  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, dateTimeOptions);
  }, [locale]);

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
        // Inyectamos las variables dinámicas una sola vez en el padre
        ["--row-height" as any]: `${rowHeight}px`,
        ["--row-width" as any]: rowWidth,
      }}
    >
      {tasks.map((t) => {
        // Determinamos el símbolo del expansor de forma limpia
        const expanderSymbol =
          t.hideChildren === false ? "▼" : t.hideChildren === true ? "▶" : "";

        // Comprobamos si la fila actual es la seleccionada
        const isSelected = t.id === selectedTaskId;

        return (
          <div
            className={`${styles.taskListTableRow} ${isSelected ? styles.selectedRow : ""}`}
            key={t.id} // Evita usar sufijos como 'row' si el id ya es único
            onClick={() => setSelectedTask(t.id)}
          >
            <div className={styles.taskListCell} title={t.name}>
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={(e) => {
                    e.stopPropagation(); // Evita activar la selección de fila al expandir
                    onExpanderClick(t);
                  }}
                >
                  {expanderSymbol}
                </div>
                <div>{t.name}</div>
              </div>
            </div>

            <div className={styles.taskListCell}>
              &nbsp;{formatter.format(t.start)}
            </div>

            <div className={styles.taskListCell}>
              &nbsp;{formatter.format(t.end)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
