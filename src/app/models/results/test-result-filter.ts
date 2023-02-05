import {TestType} from "../tests/test-info";

export interface TestResultFilter {
  testTypeFilter: TestType;
  dateRangeFormFilter: string;
  dateRangeToFilter: string;
}
