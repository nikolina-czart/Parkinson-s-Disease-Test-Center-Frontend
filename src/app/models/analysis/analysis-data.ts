import {Side} from "./side";
import {MedicineSupply} from "./medicine-supply";
import {TestType} from "../tests/test-info";

export interface Result{
  patientFullName: string;
  typeTest: TestType;
  dateTest: string;
  hoursSinceLastMed: number;
  side: Side,
  medSupply: MedicineSupply,
  vectorLength: number
  result: Array<Array<number>>,

  //jaka forma wykresu zero jedynkowego, czy on powinien tu być dla wszystkich ?

}
