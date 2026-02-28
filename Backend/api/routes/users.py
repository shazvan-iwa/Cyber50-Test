from fastapi import APIRouter, Depends
from api.deps import get_current_user, get_all_users
from schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
def get_me(current_user = Depends(get_current_user)):
    # print(current_user.email)
    return current_user

@router.get("/getAllUsers", response_model=list[UserResponse])
def get_all_users_route(all_users = Depends(get_all_users)):
    return all_users