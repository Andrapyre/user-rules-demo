import { RuleAction } from "./RuleAction.interface"
import { RuleActionType } from "./RuleActionType.enum"

export interface SendMqttMessageAction extends RuleAction {
  type: RuleActionType.SEND_MQTT_MESSAGE
  topic: string
  message: any
}
