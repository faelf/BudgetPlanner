from fastapi import APIRouter
from .create import router as create_router
from .get import router as get_router

# OpenAPI tag used to group all related operations in Swagger/ReDoc.
TAG = 'User'

# Defines the base path and documentation tag for all related endpoints.
router = APIRouter(prefix = '/api/user', tags = [TAG])

# Includes the individual operation routers.
# The child router defines the endpoint path and HTTP method.
router.include_router(create_router)
router.include_router(get_router)