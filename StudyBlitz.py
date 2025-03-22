from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import SessionLocal, engine, get_db  # Import database setup (see below)
from models import User, StudyMaterial  # Import database models (see below)
from schemas import UserCreate, UserInDB, StudyMaterialCreate, StudyMaterialInDB # Import Pydantic schemas (see below)
from passlib.context import CryptContext
from typing import List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Database setup (database.py)
# ... (See below)

# Models (models.py)
# ... (See below)

# Schemas (schemas.py)
# ... (See below)


# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# User authentication
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


def authenticate_user(username, password, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    encode_jwt = JWT.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt


# API endpoints for study materials
@app.post("/study_materials/", response_model=StudyMaterialInDB, dependencies=[Depends(oauth2_scheme)])
def create_study_material(study_material: StudyMaterialCreate, db: Session = Depends(get_db)):
    db_study_material = StudyMaterial(**study_material.dict())
    db.add(db_study_material)
    db.commit()
    db.refresh(db_study_material)
    return db_study_material


@app.get("/study_materials/", response_model=List[StudyMaterialInDB], dependencies=[Depends(oauth2_scheme)])
def read_study_materials(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    study_materials = db.query(StudyMaterial).offset(skip).limit(limit).all()
    return study_materials

# ... (Add more endpoints for updating, deleting, etc.)
