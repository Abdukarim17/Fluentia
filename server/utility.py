from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

from sqlalchemy import select, update, delete, insert

from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from models import UserInformation
from database import database


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Verifies if the password entered by user matches their saved password
def verify_password(entered_password: str, hashed_password: str) -> bool:
    """
    Verifies if the password entered by user matches their saved password

    Parameters:

    **entered_password**(str) - The user entered password
    **hashed_password**(str) - The hashed password stored in the database
    """
    
    return pwd_context.verify(secret=entered_password, 
                              hash=hashed_password)


def hash_password(password: str) -> str:
    """
    Hashes the password entered by the user

    Parameters:

    **password**(str) - User password that needs to be hashed before entering the database
    """
    
    return pwd_context.hash(password)


def create_access_token(data: dict) -> str:
    """
    Creates a JSON Web Token(JWT) to authenticate API requests

    Parameters:
    **data**(dict{}) - 
    """
    
    to_encode = data.copy()

    # set the expiry time
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # add the expiry time to JWT
    to_encode.update({'exp': expire})

    # create and encrypt JWT
    return jwt.encode(claims=to_encode, 
                      key=SECRET_KEY, 
                      algorithm=ALGORITHM)


async def get_user_by_email(email: str):
    """
    Retrieves user information from the database by email

    Parameters:
    **email**(str) - The email of the user
    """

    async with database.transaction():
        user = await database.fetch_one(query=select([UserInformation]).where(UserInformation.c.email == email))

    return user


async def create_user(fname: str, lname: str, email: str, username: str, password: str) -> None:
    """
    Creates a new user in the database

    Parameters:
    **fname**(str) - Users first name
    **lname**(str) - Users last name
    **email**(str) - Users email
    **username**(str) - Users desired username
    **password**(str) - Users desired password
    """

    hashed_password = hash_password(password)

    async with database.transaction():
        user = await database.execute(query=insert(UserInformation).values(first_name=fname, 
                                                                             last_name=lname, 
                                                                             email=email, 
                                                                             username=username, 
                                                                             password=hashed_password))
    
    return



def user_is_skilled(user):
    #if user.skill is greater or equal to some threshold then set boolean to true


    return 1

def user_is_validated(user):

    # user validation here

    return 1


def accepted_call(user):
    #user clicks either on accept or decline call and set boolean value to true or false

    return 1


def find_match(user):

    

    return 1








