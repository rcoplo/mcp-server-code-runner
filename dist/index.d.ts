import { McpServerEndpoint } from "./streamableHttp.js";
export type Transport = 'stdio' | 'http';
export interface HttpServerOptions {
    port?: number;
}
export declare function startMcpServer(transport: Transport, options?: HttpServerOptions): Promise<void | McpServerEndpoint>;
//# sourceMappingURL=index.d.ts.map