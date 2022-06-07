/**
 * 接口定义
 * op: 操作码，api
 * msg: 请求参数
 * ret: 返回数据
 */

export interface ConfigInfo {
  // 配置加个显示名称
  urlsList?: Array<{
    keywords: string,
    url: string,
    createUrlTime: string;
    isDelete: boolean
  }>;
  // 配置名
  name: string;
  // 创建时间
  createTime: string;
  // 是否被删除，删除则不显示，本质是过滤数据库中该属性
  isDeleted?: boolean;
}

export interface SaveConfigParams {
  namespace: string;
  name: string;
  urls: string[],
  id: string,
  createTime?: string
}

export type Protocol =

  // 发消息
  | {
    op: "sendMsg",
    msg: {
      robotName: string,
      targetUrl: string,
      messageType: string,
      picUrl: string,
      linkUrl: string,
      text: any,
      title: string,
      content: any,
      singleTitle: string,
      singleURL: string,
      btnOrientation: any,
      actionCardBtns: Array<{
        title: string,
        actionUrl: string
      }>,
      feedCardBtns: Array<{
        title: string,
        messageURL: string,
        picURL: string
      }>
    },
    // msg:any,
    ret: {
      errorInfo: string,
    }
  }

  // 创建配置
  | {
    op: "createConfig";
    msg: {
      name: string, urlsList: Array<{
        keywords: string,
        url: string,
        createUrlTime: string;
        isDelete: boolean
      }>,
      keywords,
      url
    };
    ret: { config: ConfigInfo };
  }

  // 修改配置
  | {
    op: 'updateConfig',
    msg: {
      name: string,
      preUrl: string,
      updatedUrl: string,
      keywords?: string
    },
    ret: {
      config: ConfigInfo
    }
  }
  // 删除配置
  | {
    op: 'deleteConfig',
    msg: {
      name: string,
      deleteUrl: string
    }
  }
  // 列出所有配置
  | {
    op: "listConfig",
    ret: { configs: ConfigInfo[] }
  }