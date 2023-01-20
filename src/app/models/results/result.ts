import {TestType} from "../tests/test-type";
import {Side} from "../side";
import {MedicineSupply} from "../medicine-supply";

export interface Result{
  patientFullName: string;
  typeTest: TestType;
  dateTest: string;
  hoursSinceLastMed: number;
  side: Side,
  medSupply: MedicineSupply,
  result_timestamp: Array<number>,
  result_x: Array<number>,
  result_y: Array<number>,
  result_z: Array<number>,

  result_state: Array<number>;

  //jaka forma wykresu zero jedynkowego, czy on powinien tu być dla wszystkich ?

}
