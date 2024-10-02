# FastAPI app file 
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# MongoDB connection
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.diagramDB
collection = db.diagrams

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for diagram
class Diagram(BaseModel):
    title: str
    diagram: str

@app.post("/diagram/")
async def upload_diagram(data: Diagram):
    await collection.insert_one(data.dict())
    return {"status": "Diagram stored successfully"}

@app.get("/diagrams/")
async def get_all_diagrams():
    diagrams = await collection.find().to_list(100)
    return diagrams

@app.get("/diagram/{title}")
async def get_diagram_by_title(title: str):
    diagram = await collection.find_one({"title": title})
    if not diagram:
        raise HTTPException(status_code=404, detail="Diagram not found")
    return diagram
