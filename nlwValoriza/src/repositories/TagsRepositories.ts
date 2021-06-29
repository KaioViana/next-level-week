 import { EntityRepository, Repository } from 'typeorm'
 import { Tag } from '../models/Tag'


 @EntityRepository(Tag)
 export class TagsRepositories extends Repository<Tag> {
 }
 