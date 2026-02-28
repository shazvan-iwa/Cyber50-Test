from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import UserCreate, Login, UserResponse
from services.user_service import create_user, authenticate_user
from core.security import create_access_token
from api.deps import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    #print(user.email)
    return create_user(db, user)

@router.post("/login")
def login(user: Login, db: Session = Depends(get_db)):
    authenticated = authenticate_user(db, user.email, user.password)
    #print(authenticated)
    if not authenticated:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(authenticated.email)
    # print(token)
    return {"access_token": token, "token_type": "bearer"}