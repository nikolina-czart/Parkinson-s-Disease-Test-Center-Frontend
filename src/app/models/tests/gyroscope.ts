import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";

export interface Gyroscope {
  type: TestType.GYROSCOPE,
  name: "Badanie drżeń",
  icon: "watch",
  chartTypes: [ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
