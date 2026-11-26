from fastapi import APIRouter
from .login import router as login_router
from .logout import router as logout_router
from .session import router as session_router
from .me import router as me_router

# OpenAPI tag used to group all related operations in Swagger/ReDoc.
TAG = 'Authentication'

# Defines the base path and documentation tag for all related endpoints.
router = APIRouter( prefix='/api/auth', tags=[TAG], )

# Includes the individual operation routers.
# The child router defines the endpoint path and HTTP method.
router.include_router(login_router)
router.include_router(logout_router)
router.include_router(session_router)
router.include_router(me_router)