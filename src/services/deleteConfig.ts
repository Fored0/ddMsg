import { Service } from "../types/service";
import global from "../global";
export default (async (msg, ctx) => {

  let current = await global.configData.load(msg.name)
  const length = current.urlsList.length

  let showUrl = []

  function hha() {
    current.urlsList.map((item) => {
      if (item.url === msg.deleteUrl) {
        showUrl.push({
          keywords: item.keywords,
          url: item.url,
          createUrlTime: item.createUrlTime,
          isDelete: true
        })
      } else {
        showUrl.push(item)
      }
    })
    return showUrl
  }

  function showData() {
    if (length === 1) {
      return {
        name: current.name,
        urlsList: [{
          keywords: current.urlsList[0].keywords,
          url: current.urlsList[0].url,
          createUrlTime: current.urlsList[0].createUrlTime,
          isDelete: true
        }],
        isDeleted: true,
        createTime: current.createTime,
      }
    } else {
      return {
        name: current.name,
        isDeleted: current.isDeleted,
        createTime: current.createTime,
        urlsList: hha()
      }
    }
  }

  await global.configData.save(msg.name, showData())
  return {}

}) as Service<"deleteConfig">;