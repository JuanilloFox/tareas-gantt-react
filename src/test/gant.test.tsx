import React from "react";
import { createRoot } from "react-dom/client";
import { Gantt } from "../index";

// Declare test globals to satisfy TypeScript when test type defs are not installed
declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void): void;
declare function beforeEach(fn: () => void): void;
declare function afterEach(fn: () => void): void;

describe("Componente Gantt", () => {
  let container;
  let root: any;

  beforeEach(() => {
    container = document.createElement("div");
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
  });

  it("renders without crashing", () => {
    const tareasMock: any[] = [
      {
        id: "Tarea 0",
        nombre: "Redesign website",
        inicio: new Date(2020, 0, 1),
        fin: new Date(2020, 2, 2),
        progreso: 45,
        tipo: "tarea",
      },
    ];

/*   const tareasMock: Tarea[] = [
    {
      id: "Task 0",
      name: "Redesign website",
      start: new Date(2020, 0, 1),
      end: new Date(2020, 2, 2),
      progress: 45,
      type: "task",
    },
  ];*/
    root.render(<Gantt tareas = { tareasMock} />);
  });
});
