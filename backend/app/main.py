from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.routes_health import router as health_router
from app.api.routes_analyze import router as analyze_router
from app.api.routes_history import router as history_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="ReportSaathi API - Explaining medical laboratory reports in simple language for educational purposes."
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health_router, prefix="/api")
app.include_router(analyze_router, prefix="/api")
app.include_router(history_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Welcome to ReportSaathi API. Your educational medical report assistant.",
        "docs": "/docs",
        "health": "/api/health"
    }
