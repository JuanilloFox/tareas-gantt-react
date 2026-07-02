# tareas-gantt-react

## Diagrama de Gantt interactivo para React con TypeScript.

![ejemplo](https://user-images.githubusercontent.com/26743903/88215863-f35d5f00-cc64-11ea-81db-e829e6e9b5c8.png)

## [Demostración en vivo](https://github.com/JuanilloFox/tareas-gantt-react)

## Instalar

```
npm install tareas-gantt-react
```

## How to use it

```javascript
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'tareas-gantt-react';
import "tareas-gantt-react/dist/index.css";

let tasks: Task[] = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
    ...
];
<Gantt tasks={tasks} />
```

Puedes manejar acciones

```javascript
<Gantt
  tasks={tasks}
  viewMode={view}
  onDateChange={onTaskChange}
  onTaskDelete={onTaskDelete}
  onProgressChange={onProgressChange}
  onDoubleClick={onDblClick}
  onClick={onClick}
/>
```

## Cómo ejecutar un ejemplo

```
cd ./ejemplo
npm install
npm start
```

## Configuración de Gantt

### GanttProps

| Nombre del parámetro            | Tipo          | Descripción                                        |
| :------------------------------ | :------------ | :------------------------------------------------- |
| tasks\*                         | [Task](#Task) | Matriz de tareas.                                  |
| [EventOption](#EventOption)     | interface     | Especifica los eventos de Gantt.                   |
| [DisplayOption](#DisplayOption) | interface     | Especifica el tipo de vista y el idioma de la      |
|                                 |               | línea de tiempo que se muestra.                    |
| [StylingOption](#StylingOption) | interface     | Especifica los estilos de gráficos y tareas        |
|                                 |               | globales.                                          |

### EventOption

| Nombre del parámetro | Tipo                           | Descripción                                                |
| :------------------- | :----------------------------- | :--------------------------------------------------------- |
| onSelect             | (task: Task, isSelected:       | Especifica la función que se ejecutará al seleccionar o    |
|                      | boolean) => void               | deseleccionar un elemento de la barra de tareas.           |
| onDoubleClick        | (task: Task) => void           | Especifica la función que se ejecutará en el evento        |
|                      |                                | onDoubleClick de la barra de tareas.                       |
| onClick              | (task: Task) => void           | Especifica la función que se ejecutará en el evento        |
|                      |                                | onClick de la barra de tareas.                             |
| onDelete\*           | (task: Task) => void/boolean/  | Especifica la función que se ejecutará en la barra de      |
|                      | Promise<void>/Promise<boolean> | tareas al pulsar el botón Eliminar.                        |
| onDateChange\*       | (task: Task, children: Task[]) | Especifica la función que se ejecutará cuando finalice el  |
|                      | => void/boolean/Promise<void>/ | evento de arrastrar la barra de tareas en la línea de      |
|                      | Promise<boolean>               | tiempo.                                                    |
| onProgressChange\*   | (task: Task, children: Task[]) | Especifica la función que se ejecutará cuando finalice el  |
|                      | => void/boolean/Promise<void>/ | evento de progreso de arrastre de la barra de tareas.      |
|                      | Promise<boolean>               |                                                            |
| onExpanderClick\*    | onExpanderClick: (task: Task)  | Especifica la función que se ejecutará al hacer clic       |
|                      | => void;                       | en el expansor de tabla.                                   |
| timeStep             | number                         | Valor del intervalo de tiempo para onDateChange.           |
|                      |                                | Especifique en milisegundos.                               |

\* El gráfico deshace la operación si el método devuelve falso o error. El parámetro children devuelve registros de un nivel de profundidad.

### DisplayOption

| Nombre del     |         |
| parámetro      | Tipo    | Descripción                                                                            |
| :------------- | :------ | :------------------------------------------------------------------------------------- |
| viewMode       | enum    | Especifica la escala de tiempo. Hora, Cuarto de día, Medio día, Día, Semana            |
|                |         |  (ISO-8601, el primer día es lunes), Mes, Trimestre, Año.                              |
| viewDate       | date    | Especifica la fecha y la hora de visualización.                                        |
| preStepsCount  | number  | Especifica un espacio vacío antes de la primera tarea.                                 |
| locale         | string  | Especifica el idioma del nombre del mes. Formatos compatibles: ISO 639-2, Java Locale. |
| rtl            | boolean | Configura el modo RTL.                                                                 |

### StylingOption

| Nombre del parámetro       | Tipo   | Descripción                                                                 |
| :------------------------- | :----- | :-------------------------------------------------------------------------- |
| headerHeight               | number | Especifica la altura del encabezado.                                        |
| ganttHeight                | number | Especifica la altura del diagrama de Gantt sin encabezado. El valor         |
|                            |        | predeterminado es 0. Esto significa que no hay limitación de altura.        |
| columnWidth                | number | Especifica la duración del período de tiempo.                               |
| listCellWidth              | string | Especifica el ancho de la celda de la lista de tareas. Una cadena vacía     |
|                            |        | significa "no mostrar".                                                     |
| rowHeight                  | number | Especifica la altura de la fila de tareas.                                  |
| barCornerRadius            | number | Especifica el redondeo de las esquinas de la barra de tareas.               |
| barFill                    | number | Especifica la ocupación de la barra de tareas. Se establece en porcentaje   |
|                            |        | de 0 a 100.                                                                 |
| handleWidth                | number | Specifies width the taskbar drag event control for start and end dates.                        |
| fontFamily                 | string | Specifies the application font.                                                                |
| fontSize                   | string | Specifies the application font size.                                                           |
| barProgressColor           | string | Specifies the taskbar progress fill color globally.                                            |
| barProgressSelectedColor   | string | Specifies the taskbar progress fill color globally on select.                                  |
| barBackgroundColor         | string | Specifies the taskbar background fill color globally.                                          |
| barBackgroundSelectedColor | string | Specifies the taskbar background fill color globally on select.                                |
| arrowColor                 | string | Specifies the relationship arrow fill color.                                                   |
| arrowIndent                | number | Specifies the relationship arrow right indent. Sets in px                                      |
| todayColor                 | string | Specifies the current period column fill color.                                                |
| TooltipContent             |        | Specifies the Tooltip view for selected taskbar.                                               |
| TaskListHeader             |        | Specifies the task list Header view                                                            |
| TaskListTable              |        | Specifies the task list Table view                                                             |

- TooltipContent: [`React.FC<{ task: Task; fontSize: string; fontFamily: string; }>;`](https://github.com/JuanilloFox/tareas-gantt-react/blob/main/src/components/other/tooltip.tsx#L56)
- TaskListHeader: `React.FC<{ headerHeight: number; rowWidth: string; fontFamily: string; fontSize: string;}>;`
- TaskListTable: `React.FC<{ rowHeight: number; rowWidth: string; fontFamily: string; fontSize: string; locale: string; tasks: Task[]; selectedTaskId: string; setSelectedTask: (taskId: string) => void; }>;`

### Task

| Nombre del                                                                                                         |
| parámetro      | Tipo     | Descripción                                                                            |
| :------------- | :------- | :------------------------------------------------------------------------------------- |
| id\*           | string   | ID de tarea.                                                                           |
| name\*         | string   | Nombre visual de la tarea.                                                             |
| type\*         | string   | Tipo de visualización de tareas: **task**, **milestone**, **project**                  |
| start\*        | Date     | Fecha de inicio de la tarea.                                                           |
| end\*          | Date     | Fin de la tarea date.                                                                  |
| progress\*     | number   | Progreso de la tarea. Se muestra en porcentaje de 0 a 100.                             |
| dependencies   | string[] | Especifica los identificadores de las dependencias principales.                        |
| styles         | object   | Especifica localmente la configuración de estilo de la barra de tareas. El objeto      |
|                |          | se pasa con los siguientes atributos:                                                  |
|                |          | - **backgroundColor**: Cadena. Especifica localmente el color de relleno del fondo de  |
|                |          |   la barra de tareas.                                                                  |
|                |          | - **backgroundSelectedColor**: Cadena. Especifica localmente el color de relleno del   |
|                |          |   fondo de la barra de tareas al seleccionarla.                                        |
|                |          | - **progressColor**: Cadena. Especifica localmente el color de relleno de la barra de  |
|                |          |   progreso.                                                                            |
|                |          | - **progressSelectedColor**: Cadena. Especifica el color de relleno de la barra de     |
|                |          |   progreso de forma global al seleccionarla.                                           |
| isDisabled     | bool     | Deshabilita todas las acciones para la tarea actual.                                   |
| fontSize       | string   | Especifica el tamaño de fuente de la barra de tareas localmente.                       |
| project        | string   |Nombre del proyecto de tarea                                                            |
| hideChildren   | bool     | Ocultar elementos secundarios. El parámetro funciona solo con el tipo de proyecto.     |

\*Requerido

## Licencia

[MIT](https://oss.ninja/mit/jaredpalmer/)
