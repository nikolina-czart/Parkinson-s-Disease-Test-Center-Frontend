import {Test} from "../tests/test";

export interface Patient {
  uid: string;
  name: string;
  surname: string;
  email: string
  patientTests: Test[]
}
