import {TestType} from "../tests/test-type";

export interface TestResultFilter {
  testTypeFilter: TestType;
  dateRangeFormFilter: string;
  dateRangeToFilter: string;
}
