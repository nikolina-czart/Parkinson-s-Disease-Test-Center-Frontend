import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {Test} from "./test";

export class ToeTapping implements Test{
  type = TestType.ACCELEROMETER;
  name = TestName.ACCELEROMETER;
  icon = TestIcon.ACCELEROMETER;
  chartTypes = [ChartType.CHART_STATE, ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D];
}
