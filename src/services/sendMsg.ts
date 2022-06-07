import { Service } from "../types/service";
import global from "../global";
import sendDDMsg, { MsgType } from "@gswl/ddmsg"

export default (async (msg, ctx) => {

    const { robotName, picUrl, linkUrl, text, title, messageType, singleTitle, singleURL, btnOrientation, actionCardBtns, feedCardBtns } = msg
    const target = await global.configData.load(robotName)
    const targetUrls = target.urlsList

    switch (messageType) {
        case 'text':
            targetUrls.forEach((item: any) => {
                sendDDMsg(item.url, {
                    msgtype: MsgType.text,
                    text: {
                        content: `${item.keywords}:${text}`
                    },
                    at: { isAtAll: true },
                }).catch(err => console.log(err)
                )
            })
            break;
        case 'link':
            targetUrls.forEach((item: any) => {
                sendDDMsg(item.url, {
                    msgtype: MsgType.link,
                    link: {
                        text: `${item.keywords}:${text}`,
                        title: title,
                        picURL: picUrl,
                        messageURL: linkUrl
                    }
                }).catch(err => console.log(err)
                )
            })
            break;
        case 'markdown':
            targetUrls.forEach((item: any) => {
                sendDDMsg(item.url, {
                    msgtype: MsgType.markdown,
                    markdown: {
                        text,
                        title: `${item.keywords}:${text}`
                    },
                    at: { isAtAll: true }
                }).catch(err => console.log(err)
                )
            })
            break;
        case 'singleActionCard':
            targetUrls.forEach((item: any) => {
                sendDDMsg(item.url, {
                    msgtype: MsgType.actionCard,
                    actionCard: {
                        title,
                        text: `${item.keywords}:${text}`,
                        singleTitle,
                        singleURL,
                        btns: actionCardBtns.map((item: any) => {
                            return {
                                title: item.title,
                                actionURL: item.actionURL
                            }
                        })
                    }
                }).catch(err => console.log(err)
                )
            })
            break;
        case 'multipleActionCard':
            targetUrls.forEach((item: any) => {
                sendDDMsg(item.url, {
                    msgtype: MsgType.actionCard,
                    actionCard: {
                        title,
                        text: `${item.keywords}:${text}`,
                        btnOrientation,
                        btns: actionCardBtns.map((item: any) => {
                            return {
                                title: item.title,
                                actionURL: item.actionURL
                            }
                        })
                    }
                }).catch(err => console.log(err)
                )
            })
            break;
        case 'feedCard':
            targetUrls.forEach((item: any) => {
                sendDDMsg(item.url, {
                    msgtype: MsgType.freeCard,
                    freeCard: {
                        links: feedCardBtns.map((item: any) => {
                            return {
                                title: item.title,
                                messageURL: item.messageURL,
                                picURL: item.picURL
                            }
                        })
                    }
                }).catch(err => console.log(err)
                )
            })
    }
    return {}
}) as Service<"sendMsg">;
