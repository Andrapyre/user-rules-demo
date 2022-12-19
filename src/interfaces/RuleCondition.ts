import { ConditionOperator } from "./ConditionOperator.enum";

export interface RuleCondition {
  key: string;
  operator: ConditionOperator;
  value: string;
}
