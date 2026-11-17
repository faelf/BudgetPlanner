from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import get_database
from models.user import User
from schemas.user import UserResponse

# Defined in __init__.py
router = APIRouter()

ROUTER_CONFIG = {
    'response_model': list[UserResponse],
    'status_code': 200,
    'summary': 'Get all users',
    'responses': {
        200: {
            'model': list[UserResponse],
            'description': 'List of all users. Empty if none exist.',
        },
    },
}

@router.get('/get/all', **ROUTER_CONFIG)
def get_all_users(db: Session = Depends(get_database)):
    """
    # Retrieves all user accounts

    ## 1. Database session
    - `db: Session = Depends(get_database)`
    - FastAPI calls `get_database()` and injects the yielded session.
    - The session is closed after the request is completed.

    ## 2. Query the database
    - `db.query(User).all()` returns every row in the users table.
    - An empty list is returned if there are no users (not an error).

    ## 3. Response serialisation
    - Each `User` object is converted using the `UserResponse` schema.
    - Sensitive fields such as `password_hash` are excluded, provided
      they are not defined in `UserResponse`.
    """

    users = db.query(User).all()

    return users