from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

#python -m uvicorn app:app --reload

app = FastAPI(title="Workflow ML Service")

# Load trained model
model = joblib.load("workflow_model.pkl")


class PredictionRequest(BaseModel):
    taskType: str
    dependencyCount: int
    retryCount: int
    workflowSize: int
    previousDuration: float


@app.get("/")
def home():
    return {
        "status": "Running",
        "service": "Workflow ML Prediction API"
    }


@app.post("/predict")
def predict(request: PredictionRequest):

    input_data = pd.DataFrame([{
        "taskType": request.taskType,
        "dependencyCount": request.dependencyCount,
        "retryCount": request.retryCount,
        "workflowSize": request.workflowSize,
        "previousDuration": request.previousDuration
    }])

    prediction = model.predict(input_data)

    return {
        "predictedDuration": round(float(prediction[0]), 2)
    }