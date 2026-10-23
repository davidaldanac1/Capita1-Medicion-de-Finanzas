from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend oficial de Capita1 - Control Financiero Personal",
    version="0.1.0",
)

# Configuración CORS (en local permite la comunicación directa con React en el puerto 3000 o 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
    }