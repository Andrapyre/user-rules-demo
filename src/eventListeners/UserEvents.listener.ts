import { UserEvents } from "@interfaces/AppEvents.enum"
import { User } from "@interfaces/User.interface"
import { RuleEngine } from "@services/RuleEngine.service"
import { EventEmitter } from "events" //this line is failing the application when the event emitter is invoked (e.g. new EventEmitter()).

interface IUserEvent {
  type: UserEvents
  user: User //probably for something like this it would make sense to have 'previousUser' and 'currentUser' fields, but keeping it to this for simplicity
}

export class UserEventsListener {
  private readonly emitter: EventEmitter
  constructor(private ruleEngine: RuleEngine) {
    this.emitter = new EventEmitter()
    this.handleUserCreatedEvents()
  }

  emit(event: IUserEvent) {
    this.emitter.emit(event.type, event.user)
  }

  handleUserCreatedEvents() {
    this.emitter.on(UserEvents.USER_CREATED, (val) => {
      this.ruleEngine.evaluateForCreateUserEvent(val)
    })
  }
}
