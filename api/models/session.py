from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import Uuid, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from api.database.session import Base


class UserSession(Base):
    __tablename__ = 'sessions'

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key = True,
        default = uuid4
    )

    user_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey('users.id'),
        nullable = False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default = func.now()
    )

    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable = False
    )

    def __repr__(self):
        return f'<Session user_id={self.user_id}>'