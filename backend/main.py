from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from jose import jwt
import uuid
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# JWT settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; replace "*" with specific domain if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Request model
class LoginRequest(BaseModel):
    username: str
    password: str

# Mock login route
@app.post("/login")
def login(data: LoginRequest):
    # Mock check (replace with any condition you want)
    if data.username == "admin" and data.password == "admin123":
        # Generate JWT token with a UUID
        payload = {
            "sub": data.username,
            "token_id": str(uuid.uuid4()),
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer", "name":'Ganesh Kumar'}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")
