from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import Uuid, String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from api.database.session import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key = True,
        default = uuid4
    )

    username: Mapped[str] = mapped_column(
        String(50),
        unique = True,
        nullable = False
    )

    email: Mapped[str] = mapped_column(
        String(100),
        unique = True,
        nullable = False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable = False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default = func.now()
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone = True),
        server_default = func.now(),
        onupdate = func.now()
    )

    def __repr__(self):
        return f'<User username={self.username}>'