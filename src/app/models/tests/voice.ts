import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {Test} from "./test";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {TestNameEng} from "./test-name-en";

export class Voice extends Test{
  override uid = TestType.VOICE;
  override name_pl = TestName.VOICE;
  override name = TestNameEng.VOICE
  override icon = TestIcon.VOICE;
}
