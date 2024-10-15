from fastapi import APIRouter, HTTPException
import uuid
import time





router=APIRouter()



matchpool=[]



@router.post("/create-room/")
def create_room(user_id: int):
    room_list = []

    if user_is_validated(user_id):
        timetaken=time.time()
        matchpool.append({user_id,user_id.skill,timetaken})
        
        
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
    
    elif user_is_validated(user_id):
        return {"error":"User is not validated or matchmaking failed"}
    else:
        return {"error":"User has not progressed enough"}
    




def user_is_validated(user):

    if user.skill>=1:
        return True
    else:
        return False


def accepted_call(user):
    

    return 1
    
    


    


def find_match(user):
    
    skillpool=sorted(matchpool.items(), key= lambda x: x['user_id'],reverse=True)

    matches=skillpool[:5]

    matches=sorted(matches.items(),key=lambda x: x['timetaken'])

    for x in range(len(matches),-1,-1):
        if accepted_call(matches[x['user_id']]) != True:
            matches.pop()
        else:
            return [user,matches[x['user_id']]]
        
    
    #either increase range of skillpool or return no matches

    return 0







    





    

    











        