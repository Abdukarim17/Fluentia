from pydantic import BaseModel, Field

# Pydantic models for request validation
class NewUser(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str = Field(min_length=8, max_length=16)
    confirm_password: str = Field(min_length=8, max_length=16)

class LoginData(BaseModel):
    email: str
    password: str = Field(min_length=8, max_length=16)


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str