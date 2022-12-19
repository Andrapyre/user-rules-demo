import { config } from "@config"
import { MongoDB } from "@databases/MongoDB"
import { Database } from "@interfaces/Database.interface"
import { Routes } from "@interfaces/Routes.interface"
import { errorMiddleware } from "@middlewares/error.middleware"
import { RulesRoute } from "@routes/rules.routes"
import { UsersRoute } from "@routes/users.routes"
import { RuleEngine } from "@services/RuleEngine.service"
import { logger, stream } from "@utils/logger"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import { connect, set } from "mongoose"
import morgan from "morgan"
import { UserEventsListener } from "eventListeners/UserEvents.listener"

export interface AppOptions {
  routes: Routes[]
  database: Database
  stream: UserEventsListener
}

export class App {
  public app: express.Application
  public env: string = config.NODE_ENV
  public port: number = config.PORT

  constructor() {
    this.app = express()
  }

  public async init(): Promise<void> {
    try {
      console.log("starting")
      const ruleEngine = new RuleEngine()
      const userEventsListener = new UserEventsListener(ruleEngine)
      console.log("ending")
      const routes = [new UsersRoute(userEventsListener), new RulesRoute()]
      const database = new MongoDB()
      await this.connectToDatabase(database)
      this.initializeMiddlewares()
      this.initializeRoutes(routes)
      this.initializeErrorHandling()
    } catch (error) {
      console.log(error)
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`)
      logger.info(`======= ENV: ${this.env} =======`)
      logger.info(`🚀 App listening on the port ${this.port}`)
      logger.info(`=================================`)
    })
  }

  public getServer() {
    return this.app
  }

  private connectToDatabase(database: Database): Promise<void> {
    if (this.env !== "production") {
      set("debug", true)
    }
    return database.connect()
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.LOG_FORMAT, { stream }))
    this.app.use(cors())
    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}
