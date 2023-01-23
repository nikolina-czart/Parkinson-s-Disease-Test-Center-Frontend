import {TestType} from "../tests/test-type";
import {Side} from "../side";
import {MedicineSupply} from "../medicine-supply";
import {FingerTappingResult} from "./FingerTappingResult";

export interface Result{
  testDate: string
  medicineSupply: string
  side: string
  timestamp: string[]
  x: string[]
  y: string[]
  z: string[]
  timestampUpDown: string[]
  upDown: string[]
}
