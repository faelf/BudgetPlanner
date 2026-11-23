from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.session import get_database
from models.user import User
from schemas.user import UserResponse, UserNotFound
from uuid import UUID

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

GET_ONE_CONFIG = {
    'response_model': UserResponse,
    'status_code': 200,
    'summary': 'Get a user by ID',
    'responses': {
        200: {
            'model': UserResponse,
            'description': 'The requested user.',
        },
        404: {
            'model': UserNotFound,
            'description': 'User not found.',
        },
    },
}

@router.get('/get/{user_id}', **GET_ONE_CONFIG)
def get_user(user_id: UUID, db: Session = Depends(get_database)):
    """
    # Retrieves a single user account

    ## 1. Request validation
    - `user_id: UUID`
    - A malformed UUID returns a `422` before the endpoint runs.

    ## 2. Find the user
    - The user is retrieved using their UUID.
    - A `404` response is returned if the user does not exist.

    ## 3. Response serialisation
    - The `User` object is converted using the `UserResponse` schema.
    """

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code = 404,
            detail = 'User not found',
        )

    return user