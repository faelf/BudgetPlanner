from fastapi import APIRouter, Depends
from api.core.dependencies import get_current_session
from api.models.session import UserSession
from api.schemas.general import DescriptionResponse

router = APIRouter()

ROUTER_CONFIG = {
    'summary': 'Get the current session',
    'responses': {
        200: {
            'model': DescriptionResponse,
            'description': 'Current session information.',
        },
        401: {
            'model': DescriptionResponse,
            'description': 'Authentication is required.',
        },
    },
}

@router.get('/session', **ROUTER_CONFIG)
def get_session_info(user_session: UserSession = Depends(get_current_session)):
    """
    # Returns information about the current session.

    ## 1. Authentication
    - `user_session: UserSession = Depends(get_current_session)`
    - FastAPI calls `get_current_session()` before executing the endpoint.
    - The dependency validates the current session.
    - If the session is invalid or missing, a `401` response is returned.

    ## 2. Return session information
    - The session ID identifies the current session.
    - The user ID identifies the user associated with the session.
    - The expiry time indicates when the session will no longer be valid.
    """

    return {
        'session_id': user_session.id,
        'user_id': user_session.user_id,
        'expires_at': user_session.expires_at,
    }