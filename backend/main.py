from fastapi import FastAPI
from routers.users import router as users_router, TAG as USERS_TAG

app = FastAPI(
    title="Budget Planner API",
    description="Main backend service",
    version="1.0.0",
    openapi_tags=[  
        {"name": USERS_TAG, "description": "Operations related to user data. This includes retrieving and managing user information."}  
    ]
)

app.include_router(users_router)