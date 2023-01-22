import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {Test} from "./test";

export class Gyroscope implements Test{
  uid = TestType.GYROSCOPE;
  name = TestName.GYROSCOPE;
  icon = TestIcon.GYROSCOPE;
  chartTypes = [ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
