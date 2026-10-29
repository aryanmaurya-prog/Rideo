from datetime import date

from pydantic import BaseModel, Field


class ForecastRequest(BaseModel):
    history: list[dict[str, float | str]] = Field(
        description="Historical daily revenue records with ds (date) and y (revenue) fields."
    )
    horizon_days: int = Field(default=7, ge=1, le=90)


class ForecastPoint(BaseModel):
    date: date
    revenue: float
    lower_bound: float
    upper_bound: float


class ForecastResponse(BaseModel):
    points: list[ForecastPoint]
    model: str
