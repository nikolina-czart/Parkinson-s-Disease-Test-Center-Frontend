import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {Test} from "./test";
import {TestNameEng} from "./test-name-en";

export class Gyroscope extends Test{
  override uid = TestType.GYROSCOPE;
  override name_pl = TestName.GYROSCOPE;
  override name = TestNameEng.GYROSCOPE
  override icon = TestIcon.GYROSCOPE;
}
