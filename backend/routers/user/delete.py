from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from database.session import get_database
from models.user import User
from schemas.user import UserNotFound

# Defined in __init__.py
router = APIRouter()

ROUTER_CONFIG = {
    'status_code': 204,
    'summary': 'Delete an existing user',
    'responses': {
        204: {
            'description': 'User successfully deleted.',
        },
        404: {
            'model': UserNotFound,
            'description': 'User not found.',
        },
    },
}

@router.delete('/delete/{user_id}', **ROUTER_CONFIG)
def delete_user(user_id: UUID, db: Session = Depends(get_database)):
    """
    # Deletes an existing user account

    ## 1. Request validation
    - `user_id: UUID`
    - FastAPI validates the UUID supplied in the URL.
    - A malformed UUID returns a `422` before the endpoint runs.

    ## 2. Database session
    - `db: Session = Depends(get_database)`
    - FastAPI injects the database session.
    - The session is closed after the request is completed.

    ## 3. Find the user
    - The user is retrieved using their UUID.
    - A `404` response is returned if the user does not exist.

    ## 4. Delete the user
    - `db.delete(user)` marks the user for deletion.
    - `db.commit()` commits the transaction.
    - The deletion is permanent.
    """

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code = 404,
            detail = 'User not found',
        )

    db.delete(user)
    db.commit()

    return None