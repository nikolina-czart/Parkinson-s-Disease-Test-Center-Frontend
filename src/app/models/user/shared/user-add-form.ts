import {Role} from "./user-role";

export interface UserAddForm {
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  uid: string;
  doctorID: string;
}
