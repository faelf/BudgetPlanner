from fastapi import APIRouter
from pydantic import BaseModel

TAG = "Users"

router = APIRouter(
    prefix="/api",
    tags=[TAG]
)

class User(BaseModel):  
    id: int  
    first_name: str  
    last_name: str

USER = {
    "id": 1,
    "first_name": "Rafael",
    "last_name": "Ferreira",
}

@router.get(
    "/user",
    response_model=User,
    summary="Get mock user",
    description="Returns mock user object for testing purposes."
    )
def read_user():
    return USER