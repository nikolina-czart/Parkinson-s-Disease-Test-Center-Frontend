import {TestDistribution} from "../../tests/test-distribution";

export interface Patient {
  uid: string;
  name: string;
  surname: string;
  email: string
  patientTests: TestDistribution[]
}
