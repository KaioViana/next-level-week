import { Repository, EntityRepository }  from 'typeorm'
import { Compliment } from '../models/Compliment';


@EntityRepository(Compliment)
export class ComplimentsRepositories extends Repository<Compliment> {}