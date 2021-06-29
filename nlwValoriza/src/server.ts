import express, {Request, Response, NextFunction} from 'express'
import { router } from './routes'
import 'reflect-metadata'
import 'express-async-errors'
import './database'


const app = express()

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log("Server is running"))
