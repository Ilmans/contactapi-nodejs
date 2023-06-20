import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(3004,() => {
  logger.info("app start on port 3004")
})