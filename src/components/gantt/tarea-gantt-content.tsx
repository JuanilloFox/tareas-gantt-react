import React, { useEffect, useState } from "react";
import { EventOption } from "../../types/public-types";
import { BarraTareas } from "../../types/barra-tareas";
import { Arrow } from "../other/arrow";
import { handleTareaPorEventoRatonSVG } from "../../Auxiliares/auxiliar-bar";
import { isKeyboardEvent } from "../../Auxiliares/otros-auxiliares";
import { TareaItem } from "../tarea-item/tarea-item";
import {
  BarMoveAction,
  GanttContentMoveAction,
  EventoGantt,
} from "../../types/tareas-gantt-actions";

export type TareaGanttContentProps = {
  tareas: BarraTareas[];
  fechas: Date[];
  eventoGantt: EventoGantt;
  tareaSeleccionada: BarraTareas | undefined;
  altoFila: number;
  anchoColumna: number;
  intervaloTiempo: number;
  svg?: React.RefObject<SVGSVGElement>;
  svgWidth: number;
  altoTarea: number;
  arrowColor: string;
  arrowIndent: number;
  fontSize: string;
  fontFamily: string;
  rtl: boolean;
  setEventoGantt: (value: EventoGantt) => void;
  setTareaFallida: (value: BarraTareas | null) => void;
  setTareaSeleccionada: (tareaId: string) => void;
} & EventOption;

export const TareaGanttContent: React.FC<TareaGanttContentProps> = ({
  tareas,
  fechas,
  eventoGantt,
  tareaSeleccionada,
  altoFila,
  anchoColumna,
  intervaloTiempo,
  svg,
  altoTarea,
  arrowColor,
  arrowIndent,
  fontFamily,
  fontSize,
  rtl,
  setEventoGantt,
  setTareaFallida,
  setTareaSeleccionada,
  onDateChange,
  onProgressChange,
  onDoubleClick,
  onClick,
  onDelete,
}) => {
  const point = svg?.current?.createSVGPoint();
  const [xStep, setXStep] = useState(0);
  const [initEventX1Delta, setInitEventX1Delta] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // create xStep
  useEffect(() => {
    const dateDelta =
      fechas[1].getTime() -
      fechas[0].getTime() -
      fechas[1].getTimezoneOffset() * 60 * 1000 +
      fechas[0].getTimezoneOffset() * 60 * 1000;
    const newXStep = (intervaloTiempo * anchoColumna) / dateDelta;
    setXStep(newXStep);
  }, [anchoColumna, fechas, intervaloTiempo]);

  useEffect(() => {
    const handleMouseMove = async (event: MouseEvent) => {
      if (!eventoGantt.tareaCambiada || !point || !svg?.current) return;
      event.preventDefault();

      point.x = event.clientX;
      const cursor = point.matrixTransform(
        svg?.current.getScreenCTM()?.inverse()
      );

      const { isChanged, tareaCambiada } = handleTareaPorEventoRatonSVG(
        cursor.x,
        eventoGantt.action as BarMoveAction,
        eventoGantt.tareaCambiada,
        xStep,
        intervaloTiempo,
        initEventX1Delta,
        rtl
      );
      if (isChanged) {
        setEventoGantt({ action: eventoGantt.action, tareaCambiada });
      }
    };

    const handleMouseUp = async (event: MouseEvent) => {
      const { action, tareaOriginalSeleccionada, tareaCambiada } = eventoGantt;
      if (!tareaCambiada || !point || !svg?.current || !tareaOriginalSeleccionada)
        return;
      event.preventDefault();

      point.x = event.clientX;
      const cursor = point.matrixTransform(
        svg?.current.getScreenCTM()?.inverse()
      );
      const { tareaCambiada: nuevatareaCambiada } = handleTareaPorEventoRatonSVG(
        cursor.x,
        action as BarMoveAction,
        tareaCambiada,
        xStep,
        intervaloTiempo,
        initEventX1Delta,
        rtl
      );

      const isNotLikeOriginal =
        tareaOriginalSeleccionada.inicio !== nuevatareaCambiada.inicio ||
        tareaOriginalSeleccionada.fin !== nuevatareaCambiada.fin ||
        tareaOriginalSeleccionada.progreso !== nuevatareaCambiada.progreso;

      // remove listeners
      svg.current.removeEventListener("mousemove", handleMouseMove);
      svg.current.removeEventListener("mouseup", handleMouseUp);
      setEventoGantt({ action: "" });
      setIsMoving(false);

      // custom operation start
      let operationSuccess = true;
      if (
        (action === "mover" || action === "fin" || action === "inicio") &&
        onDateChange &&
        isNotLikeOriginal
      ) {
        try {
          const result = await onDateChange(
            nuevatareaCambiada,
            nuevatareaCambiada.barraHijos
          );
          if (result !== undefined) {
            operationSuccess = result;
          }
        } catch (error) {
          operationSuccess = false;
        }
      } else if (onProgressChange && isNotLikeOriginal) {
        try {
          const result = await onProgressChange(
            nuevatareaCambiada,
            nuevatareaCambiada.barraHijos
          );
          if (result !== undefined) {
            operationSuccess = result;
          }
        } catch (error) {
          operationSuccess = false;
        }
      }

      // If operation is failed - return old state
      if (!operationSuccess) {
        setTareaFallida(tareaOriginalSeleccionada);
      }
    };

    if (
      !isMoving &&
      (eventoGantt.action === "mover" ||
        eventoGantt.action === "fin" ||
        eventoGantt.action === "inicio" ||
        eventoGantt.action === "progreso") &&
      svg?.current
    ) {
      svg.current.addEventListener("mousemove", handleMouseMove);
      svg.current.addEventListener("mouseup", handleMouseUp);
      setIsMoving(true);
    }
  }, [
    eventoGantt,
    xStep,
    initEventX1Delta,
    onProgressChange,
    intervaloTiempo,
    onDateChange,
    svg,
    isMoving,
    point,
    rtl,
    setTareaFallida,
    setEventoGantt,
  ]);

  /**
   * El método es el punto de inicio del cambio de tarea.
   */
  const handleBarEventStart = async (
    action: GanttContentMoveAction,
    tarea: BarraTareas,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (!event) {
      if (action === "select") {
        setTareaSeleccionada(tarea.id);
      }
    }
    // Keyboard events
    else if (isKeyboardEvent(event)) {
      if (action === "delete") {
        if (onDelete) {
          try {
            const result = await onDelete(tarea);
            if (result !== undefined && result) {
              setEventoGantt({ action, tareaCambiada: tarea });
            }
          } catch (error) {
            console.error("Error on Delete. " + error);
          }
        }
      }
    }
    // Mouse Events
    else if (action === "mouseenter") {
      if (!eventoGantt.action) {
        setEventoGantt({
          action,
          tareaCambiada: tarea,
          tareaOriginalSeleccionada: tarea,
        });
      }
    } else if (action === "mouseleave") {
      if (eventoGantt.action === "mouseenter") {
        setEventoGantt({ action: "" });
      }
    } else if (action === "dblclick") {
      !!onDoubleClick && onDoubleClick(tarea);
    } else if (action === "click") {
      !!onClick && onClick(tarea);
    }
    // Cambio de tarea en evento inicio
    else if (action === "mover") {
      if (!svg?.current || !point) return;
      point.x = event.clientX;
      const cursor = point.matrixTransform(
        svg.current.getScreenCTM()?.inverse()
      );
      setInitEventX1Delta(cursor.x - tarea.x1);
      setEventoGantt({
        action,
        tareaCambiada: tarea,
        tareaOriginalSeleccionada: tarea,
      });
    } else {
      setEventoGantt({
        action,
        tareaCambiada: tarea,
        tareaOriginalSeleccionada: tarea,
      });
    }
  };

  return (
    <g className="content">
      <g className="arrows" fill={arrowColor} stroke={arrowColor}>
        {tareas.map(tarea => {
          return tarea.barraHijos.map(child => {
            return (
              <Arrow
                key={`Arrow from ${tarea.id} to ${tareas[child.index].id}`}
                tareaDesde={tarea}
                tareaHasta={tareas[child.index]}
                altoFila={altoFila}
                altoTarea={altoTarea}
                arrowIndent={arrowIndent}
                rtl={rtl}
              />
            );
          });
        })}
      </g>
      <g className="bar" fontFamily={fontFamily} fontSize={fontSize}>
        {tareas.map(tarea => {
          return (
            <TareaItem
              tarea={tarea}
              arrowIndent={arrowIndent}
              altoTarea={altoTarea}
              isProgressChangeable={!!onProgressChange && !tarea.desactivada}
              isDateChangeable={!!onDateChange && !tarea.desactivada}
              isDelete={!tarea.desactivada}
              onEventStart={handleBarEventStart}
              key={tarea.id}
              isSelected={!!tareaSeleccionada && tarea.id === tareaSeleccionada.id}
              rtl={rtl}
            />
          );
        })}
      </g>
    </g>
  );
};
