import { Service } from "../types/service";
import global from "../global";
import { ConfigInfo } from "../protocol";

interface returnAllList {
  name: string,
  url: {
    keywords: string,
    url: string,
    createUrlTime: string;
    isDelete: boolean
  },
  isDeleted: boolean,
  createTime: string,
}

export default (async (msg, ctx) => {
  let configs: ConfigInfo[] = [];
  let showCfgs: ConfigInfo[] = [];
  let showData: returnAllList[] = [];
  configs = await global.configData.loadAll()
  configs.map((item) => {
    if (item.isDeleted != true) {
      showCfgs.push(item)
    }
  })
  showCfgs.sort((a, b) => {
    return a.createTime > b.createTime ? -1 : 1;
  })
  showCfgs.map((item) => {
    if (Array.isArray(item.urlsList)) {
      item.urlsList.map((v) => {
        if (v.isDelete != true) {
          showData.push({
            name: item.name,
            url: {
              keywords: v.keywords,
              url: v.url,
              createUrlTime: v.createUrlTime,
              isDelete: v.isDelete
            },
            isDeleted: item.isDeleted,
            createTime: item.createTime,
          });
        }
      });
    } else {
      showData.push({
        name: item.name,
        url: item.urlsList,
        isDeleted: item.isDeleted,
        createTime: item.createTime,
      });
    }
  });
  return { configs: showData };
}) as Service<"listConfig">;
