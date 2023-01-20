import {TestType} from "./test-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {ChartType} from "../chart/chart-type";

export interface Test{
  type: TestType,
  name: TestName,
  icon: TestIcon,
  chartTypes: Array<ChartType>
}
