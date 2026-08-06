from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from models.users import User
from schemas.users import UserCreate, UserResponse

TAG = "Users"

# Groups all routes under this prefix + docs tag.
router = APIRouter( prefix="/api/users", tags=[TAG] )


@router.post("", response_model=UserResponse, status_code=201)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """
    POST /api/users
    Creates a new user from the submitted

    Request body, auto-validated against UserCreate schema
    FastAPI calls get_db(), injects the yielded session, closes it after
    """

    # Build the ORM object in memory
    db_user = User(
        username=user.username,
        email=user.email,
        password_hash=user.password
    )

    # Write in the database
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user