import {Role} from "./user-role";

export interface UserDetails {
  name: string;
  surname: string;
  role: Role;
  uid: string;
  doctorID: string;
}
