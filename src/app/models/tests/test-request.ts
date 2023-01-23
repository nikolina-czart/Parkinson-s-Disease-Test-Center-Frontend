import {TestType} from "./test-type";
import {TestName} from "./test-name";
import {TestIcon} from "./test-icon";

export interface TestRequest{
  uid: TestType,
  name: TestName,
}
