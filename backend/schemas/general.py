from pydantic import BaseModel

class DescriptionResponse(BaseModel):
    description: str