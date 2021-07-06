import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUserController } from './controllers/ListUserController'


const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listTagsController = new ListTagsController()
const listUserController = new ListUserController()


router.post('/users', createUserController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin , createTagController.handle)
router.post('/sessions', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle )
router.get('/users/compliments/Receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handle)
router.get('/users', ensureAuthenticated, listUserController.handle)

export { router }
