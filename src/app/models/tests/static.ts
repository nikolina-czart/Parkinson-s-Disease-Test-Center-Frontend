import {TestType} from "./test-type";
import {ChartType} from "../chart/chart-type";
import {Test} from "./test";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {TestNameEng} from "./test-name-en";

export class Static extends Test{
  override uid = TestType.STATIC;
  override name_pl = TestName.STATIC;
  override name = TestNameEng.STATIC
  override icon = TestIcon.STATIC;
}
