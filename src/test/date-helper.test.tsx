import {
  semillaFechas,
  agregarAFecha,
  getWeekNumberISO8601,
} from "../Auxiliares/auxiliar-fecha";
import { ViewMode } from "../types/public-types";

describe("semilla fecha", () => {
  test("diario", () => {
    expect(
      semillaFechas(new Date(2020, 5, 28), new Date(2020, 6, 2), ViewMode.Dia)
    ).toEqual([
      new Date(2020, 5, 28),
      new Date(2020, 5, 29),
      new Date(2020, 5, 30),
      new Date(2020, 6, 1),
      new Date(2020, 6, 2),
    ]);
  });

  test("semanal", () => {
    expect(
      semillaFechas(new Date(2020, 5, 28), new Date(2020, 6, 19), ViewMode.Semana)
    ).toEqual([
      new Date(2020, 5, 28),
      new Date(2020, 6, 5),
      new Date(2020, 6, 12),
      new Date(2020, 6, 19),
    ]);
  });

  test("mensual", () => {
    expect(
      semillaFechas(new Date(2020, 5, 28), new Date(2020, 6, 19), ViewMode.Mes)
    ).toEqual([new Date(2020, 5, 28), new Date(2020, 6, 28)]);
  });

  test("cuarto de día", () => {
    expect(
      semillaFechas(
        new Date(2020, 5, 28),
        new Date(2020, 5, 29),
        ViewMode.Cuarto
      )
    ).toEqual([
      new Date(2020, 5, 28, 0, 0),
      new Date(2020, 5, 28, 6, 0),
      new Date(2020, 5, 28, 12, 0),
      new Date(2020, 5, 28, 18, 0),
      new Date(2020, 5, 29, 0, 0),
    ]);
  });
});

describe("agregar a fecha", () => {
  test("agregar mes", () => {
    expect(agregarAFecha(new Date(2020, 0, 1), 40, "month")).toEqual(
      new Date(2023, 4, 1)
    );
  });

  test("agregar día", () => {
    expect(agregarAFecha(new Date(2020, 0, 1), 40, "day")).toEqual(
      new Date(2020, 1, 10)
    );
  });
});

test("get week number", () => {
  expect(getWeekNumberISO8601(new Date(2019, 11, 31))).toEqual("01");
  expect(getWeekNumberISO8601(new Date(2021, 0, 1))).toEqual("53");
  expect(getWeekNumberISO8601(new Date(2020, 6, 20))).toEqual("30");
});
