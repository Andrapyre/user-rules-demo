import { ConditionOperator } from "@interfaces/ConditionOperator.enum"
import { Role } from "@interfaces/Role.enum"
import { RuleAction } from "@interfaces/RuleAction.interface"
import { RuleActionType } from "@interfaces/RuleActionType.enum"
import { Trigger } from "@interfaces/Trigger.enum"
import { Type } from "class-transformer"
import { IsDefined, IsEnum, IsString } from "class-validator"

console.log("importing dto")

class RuleConditionDto {
  @IsDefined()
  @IsString()
  key!: string

  @IsDefined()
  @IsEnum(ConditionOperator)
  operator!: ConditionOperator

  @IsDefined()
  @IsString()
  value!: string
}

class AddRoleActionDto extends RuleAction {
  @IsString()
  @IsDefined()
  type!: RuleActionType.ADD_ROLE

  @IsString()
  @IsDefined()
  userId!: string

  @IsDefined()
  @IsEnum(Role)
  role!: Role
}

class SendMqttMessageActionDto extends RuleAction {
  @IsString()
  @IsDefined()
  type!: RuleActionType.SEND_MQTT_MESSAGE

  @IsString()
  @IsDefined()
  topic!: string

  @IsDefined()
  message!: any
}

export class RuleCreateDTO {
  @IsDefined()
  @IsEnum(Trigger)
  trigger!: Trigger

  @IsDefined()
  @Type(() => RuleConditionDto)
  conditions!: RuleConditionDto[]

  @IsDefined()
  // @Type(() => RuleAction, {
  //   discriminator: {
  //     property: "type",
  //     subTypes: [
  //       { value: AddRoleActionDto, name: RuleActionType.ADD_ROLE },
  //       {
  //         value: SendMqttMessageActionDto,
  //         name: RuleActionType.SEND_MQTT_MESSAGE,
  //       },
  //     ],
  //   },
  // })
  // action!: AddRoleActionDto | SendMqttMessageActionDto
  action!: any
}
