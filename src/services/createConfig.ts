
import global from "../global";
import { ConfigInfo } from "../protocol";
import { Service } from "../types/service";
import dayjs from "dayjs";


export default (async (msg, ctx) => {

    const { name, keywords, url } = msg;

    let currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss")

    let exsitedUrl: Array<{
        keywords: string,
        url: string,
        createUrlTime: string;
        isDelete: boolean
    }>

    let current = await global.configData.load(name)

    if (current != undefined) {
        exsitedUrl = current.urlsList
    }

    const config: ConfigInfo = {
        urlsList: exsitedUrl === undefined ? [{
            keywords,
            url,
            createUrlTime: currentTime,
            isDelete: false
        }] : exsitedUrl.concat({ keywords, url, createUrlTime: currentTime, isDelete: false }),
        name,
        isDeleted: false,
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    await global.configData.save(name, config);
    return { config };

}) as Service<"createConfig">;
