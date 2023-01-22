import {Role} from "./user-role";

export interface PatientRegisterForm {
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  uid: string;
  doctorID: string;
}
