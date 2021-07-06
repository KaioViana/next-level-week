import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


export class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService()

    try {
      const compliments = listUserReceiveComplimentsService.execute(request.user_id)
  
      return response.json(compliments)

    } catch (error) {
      return response.status(400).json({error: error.message});
    }
  }
}
