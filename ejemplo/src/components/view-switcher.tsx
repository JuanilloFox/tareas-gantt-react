import React from "react";
//import "tareas-gantt-react/dist/index.css";
import "tareas-gantt-react/dist/index.css";
import { ViewMode } from "tareas-gantt-react";
type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="ViewContainer">
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Hora)}
      >
        Hora
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Cuarto)}
      >
        Cuarto de Día
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Medio)}
      >
        Medio Día
      </button>
      <button className="Button" onClick={() => onViewModeChange(ViewMode.Dia)}>
        Día
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Semana)}
      >
        Semana
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Mes)}
      >
        Mes
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Ano)}
      >
        Año
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.CuartoAno)}
      >
        Cuarto de Año
      </button>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Mostrar lista de tareas
      </div>
    </div>
  );
};
