import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {Test} from "./test";
import {TestIcon} from "./test-icon";
import {TestName} from "./test-name";
import {TestNameEng} from "./test-name-en";

export class FingerTapping extends Test{
  override uid = TestType.FINGER;
  override name_pl = TestName.FINGER_TAPPING;
  override name = TestNameEng.FINGER_TAPPING;
  override icon = TestIcon.FINGER_TAPPING;

}
