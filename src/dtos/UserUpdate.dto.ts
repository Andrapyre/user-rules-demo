import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../interfaces/Role.enum";

export class UserUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Role, { each: true })
  @IsOptional()
  roles?: Role[];
}
