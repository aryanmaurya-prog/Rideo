from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
def anomaly_status() -> dict[str, str]:
    return {"status": "not_configured", "message": "Anomaly detection requires a validated data pipeline."}
