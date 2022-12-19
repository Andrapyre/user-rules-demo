import { UserCreateDTO } from "@dtos/UserCreate.dto";
import { UserUpdateDTO } from "@dtos/UserUpdate.dto";
import { HttpException } from "@exceptions/HttpException";
import { UsersRepository } from "@repositories/users.repository";
import { Request, Response } from "express";

export class UsersController {
  constructor(private usersRepository: UsersRepository) {}

  public getUsers = async (req: Request, res: Response) => {
    const users = await this.usersRepository.getUsers();
    res.status(200).send(users);
  };

  public getUserById = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;

    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(404, `User with id: ${userId} was not found`);
    }

    res.status(200).send(user);
  };

  public createUser = async (req: Request, res: Response) => {
    const userData: UserCreateDTO = req.body;
    const user = await this.usersRepository.createUser(userData);
    res.status(201).send(user);
  };

  public updateUser = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const userData: UserUpdateDTO = req.body;

    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(404, `User with id: ${userId} was not found`);
    }

    const userUpd = await this.usersRepository.updateUserById(userId, userData);
    res.status(200).send(userUpd);
  };

  public deleteUser = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;

    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(404, `User with id: ${userId} was not found`);
    }

    await this.usersRepository.deleteById(userId);
    res.status(200).send({ message: "Deleted" });
  };
}
