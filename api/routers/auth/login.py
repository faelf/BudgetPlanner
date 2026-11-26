from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from api.core.config import settings
from api.core.security import verify_password
from api.database.session import get_database
from api.models.session import UserSession
from api.models.user import User
from api.schemas.user import UserLogin, UserResponse
from api.schemas.general import DescriptionResponse

# Defined in __init__.py
router = APIRouter()

ROUTER_CONFIG = {
    'response_model': UserResponse,
    'status_code': 200,
    'summary': 'Log in a user',
    'responses': {
        200: {
            'model': UserResponse,
            'description': 'User authenticated successfully and a new session was created.',
        },
        401: {
            'model': DescriptionResponse,
            'description': 'Invalid username or password.',
        },
    },
}

@router.post('/login', **ROUTER_CONFIG)
def login(credentials: UserLogin, response: Response, database: Session = Depends(get_database)):
    """
    # Authenticates a user and creates a new session.

    ## 1. Request validation
    - `credentials: UserLogin`
    - The request body is automatically validated against the `UserLogin` schema.

    ## 2. Database session
    - `database: Session = Depends(get_database)`
    - FastAPI calls `get_database()` and injects the yielded session.
    - The session is closed after the request is completed.

    ## 3. Find the user
    - The submitted username is used to find the registered user.
    - If the username does not exist, a `401` response is returned.

    ## 4. Verify the password
    - The submitted password is compared against the stored password hash.
    - The plain-text password is never stored or compared directly.
    - If the password is incorrect, a `401` response is returned.

    ## 5. Create a session
    - A new `UserSession` is created for the authenticated user.
    - The session expires after 24 hours.
    - The expiry time is calculated using UTC.

    ## 6. Save the session
    - `database.add(user_session)` adds the session to the database session.
    - `database.commit()` commits the new session to the database.
    - `database.refresh(user_session)` refreshes the session with the database values.

    ## 7. Create the session cookie
    - The session ID is stored in an HTTP-only cookie.
    - `secure` is controlled by `settings.COOKIE_SECURE`.
    - `SameSite` is set to `lax`.

    ## 8. Return the authenticated user
    - The authenticated user is returned using the `UserResponse` schema.
    """

    user = (database.query(User).filter(User.username == credentials.username).first())

    if not user:
        raise HTTPException(
            status_code = 401,
            detail = 'Invalid username or password',
        )

    password_valid = verify_password(
        credentials.password,
        user.password_hash,
    )

    if not password_valid:
        raise HTTPException(
            status_code = 401,
            detail = 'Invalid username or password',
        )

    user_session = UserSession(
        user_id = user.id,
        expires_at = (datetime.now(timezone.utc) + timedelta(days=1)),
    )

    database.add(user_session)
    database.commit()
    database.refresh(user_session)

    response.set_cookie(
        key = 'session_id',
        value = str(user_session.id),
        httponly = True,
        secure = settings.COOKIE_SECURE,
        samesite = 'lax',
    )

    return user