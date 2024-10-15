from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.security import OAuth2PasswordBearer

import io

from jose import jwt, JWTError

from dotenv import load_dotenv
import os

import uuid

from utility import verify_password, create_access_token, get_user_by_email, create_user, user_is_validated, user_is_skilled, accepted_call, find_match
from schemas import NewUser, LoginData
from config import SECRET_KEY, ALGORITHM
from models import lifespan

from openai import OpenAI
from groq import Groq

load_dotenv()

# create instance of the AI API clients
async def get_openai_client():
    return OpenAI(api_key=os.getenv('OPENAI_KEY'))

async def get_groq_client():
    return Groq(api_key=os.getenv('GROQ_KEY'))

# function that extracts the bearer token from the authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Dependency that extracts the email from the JWT token and returns it as a dictionary
    """
    try:
        # decodes the users jwt token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # get email from the payload which should be a string
        email: str = payload.get("sub")

        # checks if the email is found in the token
        if email is None:
            raise HTTPException(status_code=401, 
                                detail="Could not validate credentials", 
                                headers={"WWW-Authenticate": "Bearer"})
    except JWTError:
        raise HTTPException(status_code=401, 
                            detail="Could not validate credentials", 
                            headers={"WWW-Authenticate": "Bearer"})
    
    return {"email": email}


# instance of the backend app
# app = FastAPI(lifespan=lifespan)
app = FastAPI()


## Start of LOGIN/SIGNUP ENDPOINTS ##
#####################################

# Sign-Up Endpoint
@app.post("/signup/")
async def sign_up(user_data: NewUser) -> dict:
    """
    endpoint to sign-up a new user
    """

    # Check if passwords match
    if user_data.password != user_data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Check if email already exists
    existing_user = await get_user_by_email(user_data.email)

    if not existing_user:
        raise HTTPException(status_code=400, 
                            detail="Email already registered")
    
    await create_user(fname=user_data.first_name, 
                      lname=user_data.last_name, 
                      email=user_data.email, 
                      username=user_data.username, 
                      password=user_data.password)
    
    return {"msg": "User created successfully"}

# Sign-In Endpoint
@app.post("/login/")
async def sign_in(user_data: LoginData):
    """
    Login endpoint to authenticate a user, returns an access token(JWT)
    """

    user_information = await get_user_by_email(user_data.email)

    if not user_information or not verify_password(user_data.password, user_information.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user_information.email})
    return {"access_token": access_token, "token_type": "bearer"}

## End of LOGIN/SIGNUP ENDPOINTS ##
###################################


## Start of AI ENDPOINTS ##
###########################

@app.post("/conversational-ai/")
async def conversational_ai(file: UploadFile = File(...), history: list = [], current_user: dict = Depends(get_current_user), openai_client = Depends(get_openai_client), groq_client = Depends(get_groq_client)):
    """
    Endpoint to generate a response to a user's voice conversation query
    """
    if file.content_type != "audio/mpeg":
        return JSONResponse(content={"error": "Invalid file type. Only .mp3 files are allowed."}, 
                            status_code=400)
    
    contents = await file.read()  # This reads the file contents into memory as bytes
    mp3_data = io.BytesIO(contents)  # Store the mp3 file in an in-memory bytes buffer

    # transcript the audio file using the Groq API into text
    transcription = groq_client.audio.transcriptions.create(file=mp3_data, 
                                                            model="whisper-large-v3", 
                                                            prompt="Specify context or spelling", 
                                                            response_format="json", 
                                                            language="ar", 
                                                            temperature=0.0)
    
    # add the transcript to the history list
    history.append({"role": "user", "content": transcription.text})
    
    # pass text into the groq llama3.1 model to generate a response
    llm_res = groq_client.chat.completions.create(model="llama3-8b-8192", 
                                                  messages=[{"role": "system", "content": "only converse in arabic"}, {"role": "user", "content": transcription.text},], 
                                                  max_tokens=250)
    
    # add the ai response to the history list
    ai_message = {"role": "assistant", "content": llm_res.choices[0].message.content}
    history.append(ai_message)
    
    def audio_stream():
        # TTS using OpenAI's API with streaming
        with openai_client.audio.speech.with_streaming_response.create(
            model="tts-1",
            voice="shimmer",
            input=llm_res.choices[0].message.content
        ) as response:
            # Stream the audio bytes in chunks using iter_bytes()
            for chunk in response.iter_bytes(chunk_size=4096):
                yield chunk
    
    return {"history": history[-10:], 
            "audio_response": StreamingResponse(audio_stream(), media_type="audio/mpeg")}

## End of AI ENDPOINTS ##
#########################


## Start of USER2USER ENDPOINTS ##
##################################

@app.post("/create-room/")
def create_room(user_id: int):
    room_list = []

    if user_is_validated(user_id) and user_is_skilled(user_id):
        
        matched_user = find_match(user_id)  
        
        if accepted_call(user_id) and accepted_call(matched_user):
            room_list = [user_id, matched_user]  

            room_name = "room-" + str(uuid.uuid4())
            jitsi_url = f"https://meet.jitsi.si/{room_name}"

            config = {
                "configOverwrite": {
                    "startWithAudioMuted": False,
                    "disableVideo": True
                }
            }

            return {"room_url": jitsi_url, "config": config, "users": room_list}
        
        elif not accepted_call(matched_user):
            find_match(user_id)
    
    elif user_is_skilled(user_id):
        return {"error":"User is not validated or matchmaking failed"}
    else:
        return {"error":"User has not progressed enough"}
    

## End of USER2USER ENDPOINTS ##
################################
