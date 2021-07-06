import { response } from "express";
import { ListUserService } from "../services/ListUserService";


export class ListUserController {
  async handle() {
    const listUserService = new ListUserService()

    try {
      const users = listUserService.execute()

      return response.json(users)
    } catch (error) {
      return response.status(400).json({error: error.message})
    }
  }
}