from fastapi import APIRouter, HTTPException

from app.modules.forecasting.schemas import ForecastRequest, ForecastResponse
from app.modules.forecasting.service import forecast_revenue

router = APIRouter()


@router.post("", response_model=ForecastResponse)
def create_forecast(request: ForecastRequest) -> ForecastResponse:
    try:
        return forecast_revenue(request)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
