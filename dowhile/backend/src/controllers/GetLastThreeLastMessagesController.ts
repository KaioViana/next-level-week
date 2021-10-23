import { Request, Response } from "express";
import { GetLasThreeMessagesServices } from "../service/GetLastThreeMessagesService";


class GetLasThreeMessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLasThreeMessagesServices()
    const result = await service.execute()
    
    return response.json(result)
  }
}

export { GetLasThreeMessagesController }