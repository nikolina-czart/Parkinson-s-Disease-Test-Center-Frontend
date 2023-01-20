import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";

export interface ToeTapping {
  type: TestType.ACCELEROMETER,
  name: "Stukanie nogą",
  icon: "airline_seat_legroom_reduced",
  chartTypes: [ChartType.CHART_STATE, ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
