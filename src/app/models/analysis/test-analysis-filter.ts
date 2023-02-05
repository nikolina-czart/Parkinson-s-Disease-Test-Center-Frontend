import {Side} from "./side";
import {MedicineSupply} from "./medicine-supply";
import {TestType} from "../tests/test-info";

export interface TestAnalysisFilter {
  testTypeFilter: TestType;
  dataPeriod: string;
  side: Side;
  medSupply: MedicineSupply;
}
