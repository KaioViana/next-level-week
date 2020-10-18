import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import OrpahnagesController from './controllers/OrphanagesController'


const routes = Router()
const upload = multer(uploadConfig)


routes.post("/orphanages", upload.array('images'), OrpahnagesController.create)
routes.get("/orphanages", OrpahnagesController.index)
routes.get("/orphanages/:id", OrpahnagesController.show)


export default routes