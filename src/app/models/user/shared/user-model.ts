import {Role} from "./user-role";

export interface UserDetails {
  name: string;
  surname: string;
  email: string;
  role: Role;
  uid: string;
  doctorID: string;
}
