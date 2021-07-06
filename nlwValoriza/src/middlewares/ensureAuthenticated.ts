import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'


interface IPayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const tokenAuth = request.headers.authorization
  
  if(!tokenAuth) {
    return response.status(401).end()
  }

  const [, token] = tokenAuth.split(' ')

  try {
    const { sub } = verify(token, 'NlwValoriza') as IPayload
    request.user_id = sub
    
    return next()

  } catch (error) {
    return response.status(401).end()
  }
}
