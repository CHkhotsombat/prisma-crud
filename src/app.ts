import express, {Express, NextFunction, Request, Response} from 'express'
import { userRoutes } from './routes'
class App {
  public server: Express

  constructor() {
    this.server = express()
    this.middleWares()
    this.routes()
  }

  middleWares() {
    this.server.use(express.json())
  }
  routes() {
    // error handler
    this.server.use(function (err: Error | any, req: Request, res: Response, next: NextFunction) {
      console.log('err======', err);
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      const status = 500

      res.status(status).json({
        code: 500,
        message: 'test'
      })
      next()
    })

    // Welcome api
    this.server.get('/', function (req: Request, res: Response) {
      res.json({
        message: 'This is Prisma APIs.',
        nodeVersion: process.versions?.node,
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT,
      })
    })
    this.server.use('/api/users', userRoutes)
  }
}

export default new App().server