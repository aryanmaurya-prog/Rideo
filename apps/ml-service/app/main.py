from fastapi import FastAPI

from app.modules.anomaly.router import router as anomaly_router
from app.modules.forecasting.router import router as forecasting_router
from app.modules.insights.router import router as insights_router

app = FastAPI(title="Rideo ML Service", version="0.1.0")
app.include_router(forecasting_router, prefix="/v1/forecast", tags=["forecast"])
app.include_router(anomaly_router, prefix="/v1/anomalies", tags=["anomalies"])
app.include_router(insights_router, prefix="/v1/insights", tags=["insights"])


@app.get("/health", tags=["health"])
def health() -> dict[str, str]:
    return {"status": "ok", "service": "rideo-ml-service"}
