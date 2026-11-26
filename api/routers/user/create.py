from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database.session import get_database
from api.models.user import User
from api.schemas.user import UserCreate, UserResponse, UserCreateConflict
from api.core.security import hash_password

# Defined in __init__.py
router = APIRouter()

ROUTER_CONFIG = {
    'response_model': UserResponse,
    'status_code': 201,
    'summary': 'Create a new user',
    'responses': {
        201: {
            'model': UserResponse,
            'description': 'User is added to the database.',
        },
        409: {
            'model': UserCreateConflict,
            'description': 'Username or email already exists.',
        },
    },
}

@router.post('/create', **ROUTER_CONFIG)
def create_user(user: UserCreate, db: Session = Depends(get_database)):
    """
    # Creates a new user account

    ## 1. Request validation
    - `user: UserCreate`
    - The request body is automatically validated against the `UserCreate` schema.

    ## 2. Database session
    - `db: Session = Depends(get_database)`
    - FastAPI calls `get_database()` and injects the yielded session.
    - The session is closed after the request is completed.

    ## 3. Check for an existing user
    - Username must be unique.
    - Email must be unique.
    - A `409` response is returned if either already exists.

    ## 4. Password handling
    - The password is hashed before being stored.

    ## 5. Save to the database
    - `db.add(new_user)` adds the user to the session.
    - `db.commit()` commits the transaction.
    - `db.refresh(new_user)` refreshes the object with the database values.
    """

    username_exists = db.query(User).filter(User.username == user.username).first()

    if username_exists:
        raise HTTPException(
            status_code = 409,
            detail = {
                'field': 'username',
                'message': 'User already exists'
            }
        )

    email_exists = db.query(User).filter(User.email == user.email).first()

    if email_exists:
        raise HTTPException(
            status_code = 409,
            detail = {
                'field': 'email',
                'message': 'Email already exists'
            }
        )

    new_user = User(
        username = user.username,
        email = user.email,
        password_hash = hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user