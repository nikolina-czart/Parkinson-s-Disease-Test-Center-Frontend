import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";

export interface Static {
  type: TestType.STATIC,
  name: "Test posturalny",
  icon: "accessibility",
  chartTypes: [ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
