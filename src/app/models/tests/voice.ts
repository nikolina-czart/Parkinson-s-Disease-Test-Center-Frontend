import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {Test} from "./test";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";

export class Voice implements Test{
  type = TestType.VOICE;
  name = TestName.VOICE;
  icon = TestIcon.VOICE;
  chartTypes= [ChartType.CHART_STATE, ChartType.CHART_X, ChartType.CHART_Y, ChartType.CHART_Z, ChartType.CHART_3D]
}
