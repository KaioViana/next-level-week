import { getCustomRepository } from "typeorm";
import { TagsRepositories } from '../repositories/TagsRepositories'


export class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepositories)

    try {
      if(!name) {
        throw new Error('Incorrect name!')
      }
  
      const tagAlreadyExists = await tagsRepository.findOne({
        name
      })
  
      if(tagAlreadyExists) {
        throw new Error('Tag already exists!')
      }
  
      const tag = tagsRepository.create({
        name,
      })
  
      await tagsRepository.save(tag)
  
      return tag

    } catch (error) {
      return {
        error: error.message
      }
    }    
  }
}
