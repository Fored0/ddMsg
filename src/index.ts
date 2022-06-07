#!/usr/bin/env node
/**
 * 基本固定，不用改
 */
import config from "./config";
import { Cache } from "./types/cache";
import { Protocol } from "./protocol";
import { createServer } from "@gswl/netkit";

const server = createServer<Cache, Protocol>(config, `${__dirname}/services`);
server.use((ctx, next) => {
    console.log("plugin");
});
