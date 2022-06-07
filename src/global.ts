import { DataClient, Repo } from "@gswl/sdata";
import EventObject from "@gswl/event";
import config from "./config";
import { ConfigInfo,SaveConfigParams } from "./protocol";

if(!config.server.centerUrl){
    throw new Error("config.server.centerUrl is not defined");
}
const dataClient = new DataClient({ centerUrl: config.server.centerUrl });

const configData = dataClient.createRepo<ConfigInfo>("test_config");

export default {
  configData
};
