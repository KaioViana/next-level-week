import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";


export class ListTagsController {
  async handle(request: Request, response: Response) {
      const listTagsService = new ListTagsService()

      try {
        const tags = await listTagsService.execute()
        return response.json(tags)
      } catch (error) {
        return response.status(400).json({error: error.message})
      }
  }
}
