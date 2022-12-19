import { Role } from "./Role.enum"
import { RuleAction } from "./RuleAction.interface"
import { RuleActionType } from "./RuleActionType.enum"

export interface AddRoleAction extends RuleAction {
  type: RuleActionType.ADD_ROLE
  userId: string
  role: Role
}
