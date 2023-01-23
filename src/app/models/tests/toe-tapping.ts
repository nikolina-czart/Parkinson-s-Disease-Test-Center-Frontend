import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {Test} from "./test";
import {TestNameEng} from "./test-name-en";

export class ToeTapping extends Test{
  override uid = TestType.ACCELEROMETER;
  override name_pl = TestName.ACCELEROMETER;
  override name = TestNameEng.ACCELEROMETER
  override icon = TestIcon.ACCELEROMETER;
}
