import { UsersController } from "@controllers/users.controller";
import { UserCreateDTO } from "@dtos/UserCreate.dto";
import { UserUpdateDTO } from "@dtos/UserUpdate.dto";
import { Routes } from "@interfaces/Routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import { UsersRepository } from "@repositories/users.repository";
import { Router } from "express";

export class UsersRoute implements Routes {
  path = "/users";
  router = Router();
  usersController = new UsersController(new UsersRepository());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:userId`, this.usersController.getUserById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(UserCreateDTO, "body"),
      this.usersController.createUser
    );
    this.router.put(
      `${this.path}/:userId`,
      validationMiddleware(UserUpdateDTO, "body", true),
      this.usersController.updateUser
    );
    this.router.delete(`${this.path}/:userId`, this.usersController.deleteUser);
  }
}
