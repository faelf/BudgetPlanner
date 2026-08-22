from fastapi import APIRouter, Depends
from core.dependencies import get_current_user
from models.user import User
from schemas.user import UserResponse

# Defined in __init__.py
router = APIRouter()

ROUTER_CONFIG = {
    'response_model': UserResponse,
    'status_code': 200,
    'summary': 'Get the current user',
    'responses': {
        200: {
            'model': UserResponse,
            'description': 'The currently authenticated user.',
        },
        401: {
            'description': 'Authentication is required.',
        },
    },
}

@router.get('/me', **ROUTER_CONFIG)
def get_me(user: User = Depends(get_current_user)):
    """
    # Returns the currently authenticated user.

    ## 1. Authentication
    - `user: User = Depends(get_current_user)`
    - FastAPI calls `get_current_user()` before executing the endpoint.
    - The dependency validates the current session.
    - If the session is invalid or missing, a `401` response is returned.

    ## 2. Return the authenticated user
    - The authenticated `User` object is returned.
    - The response is validated and serialised using the `UserResponse` schema.
    """

    return user