from fastapi import FastAPI

data = FastAPI()

USER = {
    "id": 1,
    "first_name": "Rafael",
    "last_name": "Ferreira",
}

@data.get("/api/user", tags=["Users"])
def read_user():
    return USER