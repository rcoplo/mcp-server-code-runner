import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server.js";
export async function startStreamableHttpMcpServer(port) {
    const app = express();
    app.use(express.json());
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // set to undefined for stateless servers
    });
    // Setup routes for the server
    await server.connect(transport);
    app.post('/mcp', async (req, res) => {
        console.log('Received MCP request:', req.body);
        try {
            await transport.handleRequest(req, res, req.body);
        }
        catch (error) {
            console.error('Error handling MCP request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32603,
                        message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    });
    app.get('/mcp', async (req, res) => {
        console.log('Received GET MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed."
            },
            id: null
        }));
    });
    app.delete('/mcp', async (req, res) => {
        console.log('Received DELETE MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed."
            },
            id: null
        }));
    });
    // Start the server
    const PORT = Number(port || process.env.PORT || 3088);
    return new Promise((resolve, reject) => {
        const appServer = app.listen(PORT, (error) => {
            if (error) {
                console.error('Failed to start server:', error);
                reject(error);
                return;
            }
            const endpoint = {
                url: `http://localhost:${PORT}/mcp`,
                port: PORT
            };
            console.log(`Code Runner Streamable HTTP MCP Server listening at ${endpoint.url}`);
            resolve(endpoint);
        });
        // Handle server errors
        appServer.on('error', (error) => {
            console.error('Server error:', error);
            reject(error);
        });
    });
}
//# sourceMappingURL=streamableHttp.js.map