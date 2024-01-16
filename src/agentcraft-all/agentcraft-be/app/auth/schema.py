"""Auth Schema"""
from pydantic import BaseModel, Field  # pylint: disable = no-name-in-module


# STRONG_PASSWORD_PATTERN = re.compile(r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
# STRONG_PASSWORD_PATTERN = re.compile(r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-_]).{8,20}$")


class AuthUser(BaseModel):
    """Auth User Schema"""
    username: str
    password: str = Field(min_length=8, max_length=32)

    # @validator("password")
    # def validate_password(cls, password: str) -> str:  # pylint: disable=no-self-argument
    #     """password validator"""
    #     if not re.match(STRONG_PASSWORD_PATTERN, password):
    #         raise ValueError(
    #             "Password must contain at least "
    #             "one lower character, "
    #             "one upper character and "
    #             "one special symbol"
    #         )

    #     return password


class LoginResponse(BaseModel):
    """Login Response"""
    access_token: str
    token_type: str

class RegisterResponse(BaseModel):
    """Login Response"""
    access_token: str
    token_type: str
class JWTData(BaseModel):
    """JWT with User ID"""
    user_id: int = Field(alias="sub")


class AgentJWTData(BaseModel):
    """JWT with Agent ID"""
    agent_id: int = Field(alias="sub")