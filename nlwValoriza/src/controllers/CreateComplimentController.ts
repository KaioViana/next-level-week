import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentServise";


export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const {
      tag_id,
      user_receiver,
      user_sender,
      message
    } = request.body

    const createComplimentService = new CreateComplimentService()

    try {
      const compliment = await createComplimentService.execute({
        tag_id,
        user_receiver,
        user_sender,
        message
      })

      return response.json(compliment)
    } catch (error) {
      return response.status(400).json({error: error.message});
    }
  }
}
