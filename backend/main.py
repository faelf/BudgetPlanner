from fastapi import FastAPI
from database.session import Base, engine
from routers.users import router as users_router, TAG as USERS_TAG

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Budget Planner API",
    description="Main backend service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[  
        {
            "name": USERS_TAG,
            "description": "Operations related to user data. This includes the retrieval and management of user information."
        }  
    ]
)

app.include_router(users_router)