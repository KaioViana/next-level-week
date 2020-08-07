import express from 'express'
import ClassesControler from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string
}

const routes = express.Router()
const classesControler = new ClassesControler()
const connectionsControler = new ConnectionsController()


routes.get('/classes', classesControler.index)
routes.post('/classes', classesControler.create)

routes.post('/connections', connectionsControler.create)
routes.get('/connections', connectionsControler.index)

export default routes
