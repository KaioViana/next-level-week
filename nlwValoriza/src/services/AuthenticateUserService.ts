import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories)

    const user = await userRepositories.findOne({
      email
    })

    if(!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordCompare = await compare(password, user.password)

    if(!passwordCompare) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign({
      email: user.email,
      
    }, 'NlwValoriza', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token

  }
}
