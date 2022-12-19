import { Role } from "./Role.enum";

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: Role[];
}
