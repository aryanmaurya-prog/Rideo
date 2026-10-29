# Rideo ML service

FastAPI service for revenue forecasting, anomaly detection, and business insights.
The current endpoints define the service boundary; connect them to authenticated,
quality-checked historical data before using model outputs for business decisions.

Run locally from this directory with `python -m venv .venv`, activate the environment,
install with `pip install -e .`, and run `uvicorn app.main:app --reload --port 8000`.

