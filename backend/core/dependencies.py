from fastapi import Cookie, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone
from database.session import get_database
from models.session import UserSession
from models.user import User


def get_current_session( session_id: str | None = Cookie(default=None), db: Session = Depends(get_database) ):
    if not session_id:
        raise HTTPException( status_code = 401, detail = 'Not authenticated' )
    try:
        session_uuid = UUID(session_id)
    except ValueError:
        raise HTTPException( status_code = 401, detail = 'Invalid session' )
    user_session = db.query(UserSession).filter( UserSession.id == session_uuid ).first()
    if not user_session:
        raise HTTPException( status_code = 401, detail = 'Invalid session' )
    expires_at = user_session.expires_at.replace(tzinfo=timezone.utc)
    if expires_at <= datetime.now(timezone.utc):
        raise HTTPException( status_code = 401, detail = 'Session expired' )
    return user_session

def get_current_user( user_session: UserSession = Depends(get_current_session), db: Session = Depends(get_database) ):
    user = db.query(User).filter( User.id == user_session.user_id ).first()
    if not user:
        raise HTTPException( status_code = 401, detail = 'User not found' )
    return user