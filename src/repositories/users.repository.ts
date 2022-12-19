import { UserCreateDTO } from "@dtos/UserCreate.dto";
import { UserUpdateDTO } from "@dtos/UserUpdate.dto";
import { User } from "@interfaces/User.interface";
import { UserModel } from "@models/User.model";

export class UsersRepository {
  private model = UserModel;

  async createUser(userData: UserCreateDTO): Promise<User> {
    const user = await this.model.create(userData);
    return user.toObject();
  }

  async getUsers(): Promise<User[]> {
    return this.model.find({}).lean().exec();
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.model.findById(userId).lean().exec();
  }

  async updateUserById(
    userId: string,
    dataToUpdate: UserUpdateDTO
  ): Promise<User> {
    return this.model
      .findByIdAndUpdate(userId, dataToUpdate, { new: true })
      .lean()
      .exec();
  }

  async deleteById(userId: string): Promise<void> {
    await this.model.deleteOne({ _id: userId });
  }
}
