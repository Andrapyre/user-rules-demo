import { Rule as IRule } from "@interfaces/Rule.interface"
import { RuleCondition as IRuleCondition } from "@interfaces/RuleCondition.interface"
import { Document, model, Schema } from "mongoose"
import { ConditionOperator } from "@interfaces/ConditionOperator.enum"
import { Trigger } from "@interfaces/Trigger.enum"

console.log("importing rule model")

const ruleConditionSchema = new Schema<IRuleCondition>({
  key: { type: String, required: true },
  operator: {
    type: String,
    enum: Object.values(ConditionOperator),
    required: true,
  },
  value: { type: String, required: true },
})

const ruleSchema = new Schema<IRule>({
  trigger: { type: String, enum: Object.values(Trigger), required: true },
  conditions: [{ type: ruleConditionSchema, required: true }],
  action: { type: Object },
})

const RuleModel = model<IRule & Document>("Rule", ruleSchema)

console.log("initializing model")

export { RuleModel }
