import { User } from "@interfaces/User.interface"

export class RuleEngine {
  async evaluateForCreateUserEvent(user: User) {}

  async evaluateForUpdateUserEvent(user: User) {}
}
