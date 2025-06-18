"""Main Server"""
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse, JSONResponse
from app.auth.router import router as auth_router
from app.chat.router import router as chat_router
from app.share.router import router as share_router
from app.assistant_chat.router import router as assistant_chat_router
from app.document.router import router as document_router
from app.question.router import router as question_router
from app.apps.router import router as app_router
from app.dataset.router import router as dataset_router
from app.agent.router import router as agent_router
from app.mcp.router import router as mcp_router
from app.agentic_app.router import router as agentic_app_router
from app.chat_session.router import router as chat_session_router
from app.model.router import router as model_router
from app.assistant.router import router as assistant_router
from app.assistant_session.router import router as assistant_session_router
from app.action_tools.router import router as action_tools_router
from app.multiagent.router import router as multiagent_router
from app.common.logger import logger
from app.common.constants import RED, YELLOW, RESET

app = FastAPI()

@app.exception_handler(ValueError)
async def value_error_exception_handler(request: any, exc: ValueError):
    logger.error(f"{RED}{exc}{RESET}")
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)},
    )

@app.exception_handler(Exception)
async def http_exception_handler(request, exc):
    response_content = {"error": str(exc.detail if hasattr(exc, 'detail') else exc), "code": 500}
    return JSONResponse(status_code=500, content=response_content)

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.get('/')
def index():
    """Redirect to Docs"""
    return RedirectResponse(url='/docs')


app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(share_router, prefix="/share", tags=["Share"])
app.include_router(chat_router, prefix="/v1/chat", tags=["Chat"])
app.include_router(agent_router, prefix="/agent", tags=["Agent"])
app.include_router(mcp_router, prefix="/mcp", tags=["MCP"])
app.include_router(chat_session_router, prefix="/agent_session", tags=["AgentSession"])
app.include_router(assistant_chat_router, prefix="/v2/chat", tags=["AssistantChat"])
app.include_router(assistant_router, prefix="/assistant", tags=["Assistant"])
app.include_router(assistant_session_router, prefix="/assistant_session", tags=["AssistantSession"])
app.include_router(dataset_router, prefix="/dataset", tags=["Dataset"])
app.include_router(action_tools_router, prefix="/action_tools", tags=["ActionTools"])
app.include_router(agentic_app_router, prefix="/agentic_app", tags=["AgenticApp"])
app.include_router(model_router, prefix="/model", tags=["Model"])
app.include_router(document_router, prefix="/document", tags=["Document"])
app.include_router(question_router, prefix="/question", tags=["Question"])
app.include_router(app_router, prefix="/app", tags=["App"])
app.include_router(multiagent_router, prefix="/multiagent", tags=["MultiAgent"])
