import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {Test} from "./test";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";

export class Static implements Test{
  uid = TestType.STATIC;
  name = TestName.STATIC
  icon = TestIcon.STATIC;
  chartTypes = [ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
