import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


export class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliments = await  complimentsRepositories.find({
      where: {
        user_sender: user_id
      },
      relations: ['UserSender', 'UserReceiver', 'Tag']
    })

    return compliments
  }
}
