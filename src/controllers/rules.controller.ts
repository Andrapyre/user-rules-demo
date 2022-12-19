import { RuleCreateDTO } from "@dtos/RuleCreate.dto"
import { RulesRepository } from "@repositories/rules.repository"
import { Request, Response } from "express"

export class RulesController {
  constructor(private repository: RulesRepository) {}

  public createRule = async (req: Request, res: Response) => {
    const ruleData: RuleCreateDTO = req.body
    const rule = await this.repository.createRule(ruleData)
    res.status(201).send(rule)
  }
}
