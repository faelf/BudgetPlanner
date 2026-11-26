from fastapi import FastAPI
from api.database.session import Base, engine
from api.routers.user import router as user_router, TAG as USER_TAG
from api.routers.auth import router as auth_router, TAG as AUTH_TAG

Base.metadata.create_all( bind = engine )

app = FastAPI(
    title = 'Budget Planner',
    description = 'REST API services for the Budget Planner application.',
    version = '1.0.0',
    docs_url = '/docs',
    redoc_url = '/redoc',
    openapi_tags = [
        {
            'name': USER_TAG,
            'description': (
                'Operations related to user data, including creating, retrieving, updating and deleting users.'
            ),
        },
        {
            'name': AUTH_TAG,
            'description': (
                'Operations related to authentication, including login, logout, sessions and the current authenticated user.'
            ),
        },

    ],
)

app.include_router( user_router )
app.include_router( auth_router )