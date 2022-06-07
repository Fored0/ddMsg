import { Service } from "../types/service";
import global from "../global";
export default (async (msg, ctx) => {
  const cfg = await global.configData.load(msg.name);
  if (!cfg) {
    throw { error: "NOT_FOUND" }
  }
  cfg.urlsList.map((item) => {
    if (item.url == msg.preUrl) {
      item.keywords = msg.keywords
      item.url = msg.updatedUrl
    }
    return item
  })
  await global.configData.save(msg.name, cfg);
  return { config: cfg }
}) as Service<"updateConfig">;
