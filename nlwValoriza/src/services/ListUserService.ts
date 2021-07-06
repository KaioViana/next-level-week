import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class ListUserService {
  async execute() {
    const userRepositories = getCustomRepository(UsersRepositories)

    const users = await userRepositories.find()

    return users
  }
}
