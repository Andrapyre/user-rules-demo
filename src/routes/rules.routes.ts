import { RulesController } from "@controllers/rules.controller"
import { RuleCreateDTO } from "@dtos/RuleCreate.dto"
import { Routes } from "@interfaces/Routes.interface"
import validationMiddleware from "@middlewares/validation.middleware"
import { RulesRepository } from "@repositories/rules.repository"
import { Router } from "express"

console.log("about to initialize rules route")
export class RulesRoute implements Routes {
  path = "/rules"
  router = Router()
  rulesController = new RulesController(new RulesRepository())

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      // validationMiddleware(RuleCreateDTO, "body"),
      this.rulesController.createRule
    )
  }
}
