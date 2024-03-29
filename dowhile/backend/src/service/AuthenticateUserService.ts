import axios from 'axios'
import { prismaClient } from '../prisma/'
import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse  {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "accept": "application/json"
      }
    })

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { login, id, avatar_url, name } = response.data

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if(!user) {
      await prismaClient.user.create({
        data: {
          name,
          github_id:id,
          avatar_url,
          login
        }
      })
    }

    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id
      }
    }, process.env.JWT_SECRET,{
      subject: user.id,
      expiresIn: '1d'
    })



    return { user, token }
  }
}

export { AuthenticateUserService }