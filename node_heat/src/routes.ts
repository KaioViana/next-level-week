import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLasThreeMessagesController } from './controllers/GetLastThreeLastMessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'
import { ensureAuthenticate } from './middleware/ensureAuthenticated'


const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)
router.post('/messages', ensureAuthenticate, new CreateMessageController().handle)
router.get('/messages/last-three', new GetLasThreeMessagesController().handle)
router.get('/profile', ensureAuthenticate, new ProfileUserController().handle)

export { router }
