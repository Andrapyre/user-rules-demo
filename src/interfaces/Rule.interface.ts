import { RuleAction } from "./RuleAction.interface"
import { RuleCondition } from "./RuleCondition.interface"
import { Trigger } from "./Trigger.enum"

export interface Rule {
  trigger: Trigger
  conditions: RuleCondition[]
  action: RuleAction
}
