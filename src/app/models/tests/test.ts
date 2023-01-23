import {TestType} from "./test-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";
import {TestNameEng} from "./test-name-en";

export class Test{
  uid: TestType = TestType.DEFAULT
  name: TestNameEng = TestNameEng.DEFAULT
  name_pl: TestName = TestName.DEFAULT
  icon: TestIcon = TestIcon.DEFAULT
}
