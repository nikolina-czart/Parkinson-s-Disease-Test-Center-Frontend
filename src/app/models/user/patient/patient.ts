// import {TestDistribution} from "../../tests/test-distribution";

import {TestInformation} from "../../tests/test-information";

export interface Patient {
  uid: string;
  name: string;
  surname: string;
  email: string
  patientTests: TestInformation[]
}
