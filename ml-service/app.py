from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import subprocess
from pathlib import Path

#python -m uvicorn app:app --reload

app = FastAPI(title="Workflow ML Service")

# Load trained model
MODEL_FILE = "workflow_model.pkl"

if not Path(MODEL_FILE).exists():
    print("Model not found. Training a new model...")
    subprocess.run(["python", "train_model.py"], check=True)

print("Loading model...")
model = joblib.load(MODEL_FILE)


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