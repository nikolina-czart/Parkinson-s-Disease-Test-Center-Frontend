import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {Test} from "./test";
import {TestIcon} from "./test-icon";
import {TestName} from "./test-name";

export class FingerTapping implements Test{
  type = TestType.FINGER;
  name = TestName.FINGER_TAPPING;
  icon = TestIcon.FINGER_TAPPING;
  chartTypes = [ChartType.CHART_STATE, ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D];
}
