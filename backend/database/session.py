from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from core.config import settings

class Base(DeclarativeBase):
    """
    Shared base:
    All models must inherit from THIS so create_all() finds their tables.
    """
    pass

connect_args = {}

if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {
        # Allow SQLite connection to be used across threads
        "check_same_thread": False  
    }

engine = create_engine(
    settings.DATABASE_URL,
    connect_args = connect_args
)

SessionLocal = sessionmaker(
    autocommit = False,  # we control commits explicitly (db.commit())
    autoflush = False,   # don't auto-flush pending changes before every query
    bind = engine
)

def get_db():
    """
    FastAPI dependency:
    Yields a DB session per request, closes it after (even on error).
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()