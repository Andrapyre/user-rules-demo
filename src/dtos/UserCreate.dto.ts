import { IsDefined, IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "../interfaces/Role.enum";

export class UserCreateDTO {
  @IsString()
  @IsDefined()
  name!: string;

  @IsString()
  @IsEmail()
  @IsDefined()
  email!: string;

  @IsEnum(Role, { each: true })
  @IsDefined()
  roles!: Role[];
}
