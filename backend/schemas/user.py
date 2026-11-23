from uuid import UUID
from pydantic import BaseModel, ConfigDict

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    username: str
    email: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserCreateConflict(BaseModel):
    field: str
    message: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserNotFound(BaseModel):
    detail: str