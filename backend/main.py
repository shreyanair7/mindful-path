from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="MindAnchor Backend")

class StressInput(BaseModel):
    text: str

@app.get("/")
def root():
    return {"status": "MindAnchor backend running"}

@app.post("/analyze-stress")
def analyze_stress(data: StressInput):
    """
    Placeholder endpoint for stress analysis.
    In future, this will connect to the AI model.
    """
    return {
        "input": data.text,
        "stress_level": "moderate",
        "message": "This is a placeholder response"
    }
