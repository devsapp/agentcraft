import asyncio
from contextlib import AsyncExitStack
from typing import Optional, Dict
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp.client.sse import sse_client
class McpSingleton:
    _instances: Dict[str, 'McpSingleton'] = {}

    def __new__(cls, session_id: str, assistant_id: str):
        key = f"{session_id}_{assistant_id}"
        if key not in cls._instances:
            cls._instances[key] = super(McpSingleton, cls).__new__(cls)
            cls._instances[key].session_id = session_id
            cls._instances[key].assistant_id = assistant_id
            cls._instances[key].session: Optional[ClientSession] = None
            cls._instances[key].stdio_read = None  # Add this line
            cls._instances[key].stdio_write = None  # Add this line
            cls._instances[key].tools = []
            cls._instances[key].server_params = None
            cls._instances[key].exit_stack = AsyncExitStack()
        return cls._instances[key]

    async def connect_to_server(self, mcp_server: str):
        """Connect to an MCP server"""
        if not mcp_server:
            return []
        # if not mcp_server or self.tools:
        #     return self.tools
        self.mcp_server = mcp_server
        if mcp_server.startswith("http"):
            transport = await self.exit_stack.enter_async_context(
                sse_client(mcp_server, {"Accept": "text/event-stream"}, 60 * 5, 60 * 5)
            )
        else:
            parts = mcp_server.split()
            command = parts[0]
            args = parts[1:] if len(parts) > 1 else []
            self.server_params = StdioServerParameters(
                command=command,
                args=args,
                env=None,
            )
            # self.server_params = StdioServerParameters(
            #     command=command,
            #     args=args,
            #     env={
            #         "ALLOW_DANGEROUS": "true",
            #         "NODE_PATH": "/opt/nodejs/node_modules",
            #         "LD_LIBRARY_PATH": "/code:/code/lib:/usr/local/lib:/opt/lib:/opt/php8.1/lib:/opt/php8.0/lib:/opt/php7.2/lib",
            #         "PUPPETEER_LAUNCH_OPTIONS": '''{
            #                 "headless": true,
            #                 "executablePath": "/opt/cache/puppeteer/chrome/linux-1108766/chrome-linux/chrome",
            #                 "args": ["--no-sandbox", "--single-process", "--no-zygote"],
            #                 "timeout": 15000
            #         }'''
            #     },
            # )
            transport = await self.exit_stack.enter_async_context(stdio_client(self.server_params))

        # Common logic for both sse_client and stdio_client
        self.stdio_read, self.stdio_write = transport
        self.session = await self.exit_stack.enter_async_context(
            ClientSession(self.stdio_read, self.stdio_write)
        )
        await self.session.initialize()
        response = await self.session.list_tools()
        self.tools = response.tools
        return self.tools
        
    async def cleanup(self):
        """Clean up resources"""
        await self.exit_stack.aclose()
    async def call_tool(self, tool_name: str, arguments: Dict) -> str:
        """Call a specific tool on the MCP server"""
        if self.session:  
            result = await self.session.call_tool(tool_name, arguments=arguments)
            return result
        return ''
        # if self.mcp_server.startswith("http"):
        #         transport = await self.exit_stack.enter_async_context(
        #             sse_client(self.mcp_server, {"Accept": "text/event-stream"}, 60 * 5, 60 * 5)
        #         )
        # else:
        #     parts = self.mcp_server.split()
        #     command = parts[0]
        #     args = parts[1:] if len(parts) > 1 else []

        #     self.server_params = StdioServerParameters(
        #         command=command,
        #         args=args,
        #         env=None,
        #     )
        #     transport = await self.exit_stack.enter_async_context(stdio_client(self.server_params))

        # self.stdio_read, self.stdio_write = transport
        # self.session = await self.exit_stack.enter_async_context(
        #     ClientSession(self.stdio_read, self.stdio_write)
        # )
        # await self.session.initialize()
        # result = await self.session.call_tool(tool_name, arguments=arguments)
        # return result
        