import { logger } from "@utils/logger"
import { App } from "./App"

const main = async () => {
  try {
    const app = new App()

    await app.init()
    app.listen()
  } catch (error) {
    console.log(error)
    logger.error("App crashed with error", error)
  }
}

main()
