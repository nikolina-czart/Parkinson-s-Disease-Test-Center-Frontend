import {Side} from "./side";
import {MedicineSupply} from "./medicine-supply";
// import {TestType} from "../tests/test-info";

export interface AggregatedData{
  testLabel: string;
  hoursSinceLastMedAverage: string;
  side: Side;
  medicineSupply: MedicineSupply;
  vectorLength: number,
  result: Array<Array<number>>
}
