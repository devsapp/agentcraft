"""Main Server"""
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from app.auth.router import router as auth_router
from app.chat.router import router as chat_router
from app.document.router import router as document_router
from app.question.router import router as question_router
from app.apps.router import router as app_router
from app.dataset.router import router as dataset_router
from app.agent.router import router as agent_router
from app.model.router import router as model_router

app = FastAPI()


@app.get('/')
def index():
    """Redirect to Docs"""
    return RedirectResponse(url='/docs')


app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(chat_router, prefix="/v1/chat", tags=["Chat"])
app.include_router(document_router, prefix="/document", tags=["Document"])
app.include_router(question_router, prefix="/question", tags=["Question"])
app.include_router(app_router, prefix="/app", tags=["App"])
app.include_router(dataset_router, prefix="/dataset", tags=["Dataset"])
app.include_router(agent_router, prefix="/agent", tags=["Agent"])
app.include_router(model_router, prefix="/model", tags=["Model"])
