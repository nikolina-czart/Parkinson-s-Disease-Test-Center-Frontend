import {Role} from "./user-role";
import {TestType} from "../tests/test-type";

export interface User {
  uid: string;
  email: string;
  name: string;
  surname: string;
  role: Role;

  //rozdzielić użytkowników na pacjenta i lekarza?
}
