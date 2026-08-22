from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from core.config import settings

class Base(DeclarativeBase):
    """
    Shared base class for all SQLAlchemy models.

    All models must inherit from this class so their tables
    are registered with SQLAlchemy metadata.
    """
    pass

connect_args = {}

if settings.DATABASE_URL.startswith('sqlite'):
    connect_args = {
        # Allow SQLite connections to be used across threads.
        'check_same_thread': False,
    }

engine = create_engine(
    settings.DATABASE_URL,
    connect_args = connect_args,
)

LocalSession = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine,
)

def get_database():
    """
    FastAPI dependency that provides a database session per request.

    The session is closed after the request completes, even if an exception occurs.
    """
    database = LocalSession()
    try:
        yield database
    finally:
        database.close()