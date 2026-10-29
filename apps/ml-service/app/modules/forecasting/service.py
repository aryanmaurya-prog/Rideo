import pandas as pd
from prophet import Prophet

from app.modules.forecasting.schemas import ForecastPoint, ForecastRequest, ForecastResponse


def forecast_revenue(request: ForecastRequest) -> ForecastResponse:
    history = pd.DataFrame(request.history)
    if not {"ds", "y"}.issubset(history.columns) or len(history) < 2:
        raise ValueError("At least two historical records with ds and y fields are required.")

    history["ds"] = pd.to_datetime(history["ds"], errors="coerce")
    history["y"] = pd.to_numeric(history["y"], errors="coerce")
    history = history.dropna(subset=["ds", "y"]).sort_values("ds")
    if len(history) < 2:
        raise ValueError("Historical data must contain at least two valid date and revenue values.")

    model = Prophet(weekly_seasonality=True, yearly_seasonality="auto", daily_seasonality=False)
    model.fit(history[["ds", "y"]])
    predictions = model.predict(model.make_future_dataframe(periods=request.horizon_days))
    future = predictions.tail(request.horizon_days)
    points = [
        ForecastPoint(
            date=row.ds.date(),
            revenue=max(0.0, float(row.yhat)),
            lower_bound=max(0.0, float(row.yhat_lower)),
            upper_bound=max(0.0, float(row.yhat_upper)),
        )
        for row in future.itertuples()
    ]
    return ForecastResponse(points=points, model="prophet")
