from pydantic import BaseModel, EmailStr



# ---------------------------------
# User Registration Schema
# ---------------------------------

class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str

    role: str = "candidate"





# ---------------------------------
# User Response Schema
# ---------------------------------

class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role: str


    class Config:

        from_attributes = True