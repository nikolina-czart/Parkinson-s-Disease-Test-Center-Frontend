import {TestType} from "../tests/test-type";
import {Side} from "../side";
import {MedicineSupply} from "../medicine-supply";

export interface TestAnalysisFilter {
  testTypeFilter: TestType;
  dataPeriod: string;
  side: Side;
  medSupply: MedicineSupply;
}
