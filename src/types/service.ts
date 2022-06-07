/**
 * 不要改这个文件
 */
import { ServerService, ProtocolOp } from "@gswl/netkit";
import { Cache } from "./cache";
import { Protocol } from "../protocol";

export type Service<Op extends ProtocolOp<Protocol>> = ServerService<
    Op,
    Protocol,
    Cache
>;
