from fastapi import FastAPI

app = FastAPI()

USER = {
    "id": 1,
    "first_name": "Rafael",
    "last_name": "Ferreira",
}

@app.get("/api/user", tags=["Users"])
def read_user():
    return USER