import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";


export class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserSendComplimentsService = new ListUserSendComplimentsService()

    try {
      const compliments = listUserSendComplimentsService.execute(request.user_id)
  
      return response.json(compliments)

    } catch (error) {
      return response.status(400).json({error: error.message});
    }
  }
}
