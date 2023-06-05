import express, {Express, NextFunction, Request, Response} from 'express'
import { userRoutes } from './routes'
import { Prisma } from './services/prisma'
class App {
  public server: Express

  constructor() {
    this.server = express()
    this.middleWares()
    this.routes()
  }

  middleWares() {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: false }))
  }
  routes() {
    // Welcome api
    this.server.get('/', function (req: Request, res: Response) {
      res.json({
        message: 'This is Prisma APIs.',
        nodeVersion: process.versions?.node,
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT,
      })
    })

    // apis
    this.server.use('/api/users', userRoutes)

    // error 404
    this.server.use(function (req: Request, res: Response, next: NextFunction) {
      res.status(404).json({
        code: '40401',
        message: 'Not found.'
      })
      next()
    })
    // error handler
    this.server.use(function (err: Error | any, req: Request, res: Response, next: NextFunction) {
      let message = err.message
      let status = 500
      let code = '50000'

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          status = 422
          code = '42201'
          message = `Validate unique columns : ${err.meta?.target}`
        }
      }
      res.locals.message = message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      res.status(status).json({
        code,
        message,
      })
      next()
    })
  }
}

export default new App().server