import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";

export interface FingerTapping {
  type: TestType.FINGER,
  name: "Stukanie palcami",
  icon: "fingerprint",
  chartTypes: [ChartType.CHART_STATE, ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
