from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from api.core.dependencies import get_current_session
from api.database.session import get_database
from api.models.session import UserSession
from api.schemas.general import DescriptionResponse

# Defined in __init__.py
router = APIRouter()

ROUTER_CONFIG = {
    'response_model': DescriptionResponse,
    'status_code': 200,
    'summary': 'Log out the current user',
    'responses': {
        200: {
            'model': DescriptionResponse,
            'description': 'Session ended successfully.',
        },
        401: {
            'model': DescriptionResponse,
            'description': 'Authentication is required.',
        },
    },
}


@router.post('/logout', **ROUTER_CONFIG)
def logout(response: Response, user_session: UserSession = Depends(get_current_session), database: Session = Depends(get_database)):
    """
    # Ends the current session.

    ## 1. Authentication
    - `user_session: UserSession = Depends(get_current_session)`
    - The current session must be valid to log out.

    ## 2. Delete the session
    - The `UserSession` row is deleted from the database.
    - This immediately revokes the session, it can no longer be used.

    ## 3. Clear the cookie
    - The `session_id` cookie is cleared from the browser.
    """

    database.delete(user_session)
    database.commit()
    response.delete_cookie(key='session_id')

    return {'description': 'Logged out successfully'}