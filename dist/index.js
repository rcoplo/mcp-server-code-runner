import { startStdioMcpServer } from "./stdio.js";
import { startStreamableHttpMcpServer } from "./streamableHttp.js";
export async function startMcpServer(transport, options) {
    if (transport === 'stdio') {
        return startStdioMcpServer();
    }
    else if (transport === 'http') {
        return startStreamableHttpMcpServer(options?.port);
    }
    else {
        throw new Error('Invalid transport. Must be either "stdio" or "http"');
    }
}
//# sourceMappingURL=index.js.map