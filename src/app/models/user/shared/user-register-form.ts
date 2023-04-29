import {Role} from "./user-role";

export interface UserRegisterForm {
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  uid: string;
  doctorID: string;
  controlGroup: boolean;
}
