import {Test} from "../tests/test";

export interface Patient {
  position: number;
  uid: string;
  fullName: string;
  email: string;
  patientTests: Array<Test>
}
