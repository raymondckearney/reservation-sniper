import threading
from worker import run
from fastapi import FastAPI
from database import SessionLocal, engine
from models import Base, Target

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/targets")
def get_targets():
    db = SessionLocal()
    return db.query(Target).all()

@app.post("/targets")
def add_target(target: dict):
    db = SessionLocal()
    t = Target(**target)
    db.add(t)
    db.commit()
    return {"status": "ok"}
