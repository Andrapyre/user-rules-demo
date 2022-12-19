import { RuleCreateDTO } from "@dtos/RuleCreate.dto"
import { Rule } from "@interfaces/Rule.interface"
import { RuleModel } from "@models/Rule.model"

console.log("importing rules repo")
export class RulesRepository {
  private model = RuleModel

  constructor() {
    console.log("initialized rules model")
  }

  async createRule(RuleData: RuleCreateDTO): Promise<Rule> {
    const rule = await this.model.create(RuleData)
    return rule.toObject()
  }
}
