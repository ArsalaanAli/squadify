import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from string import ascii_uppercase, digits
import random

cred = credentials.Certificate('firebase-sdk.json')
firebase_admin.initialize_app(cred, {"databaseURL" : "https://squadify-137d7-default-rtdb.firebaseio.com"})

#roomsDB = db.reference("/Rooms")
#allRoomsData = roomsDB.get(shallow=True)
 
#BEFORE ROOM FOUND 
def GenerateRoomCode():
    return "".join(random.sample(ascii_uppercase + digits, 7))

def CreateNewRoom(roomsDB, allRoomsData):
    while True:
        newRoomCode = GenerateRoomCode()
        if newRoomCode not in allRoomsData:
            roomsDB.update({newRoomCode : True})
            return newRoomCode

def CheckRoomExists(roomCode, allRoomsData):
    return roomCode in allRoomsData

#AFTER ROOM FOUND
#urrentRoomCode = "Code"
#currentRoomDB = db.reference("/Rooms/"+currentRoomCode)
#currentRoomData = currentRoomDB.get()
#print(currentRoomData)
def AddUserToRoom(userData, currentRoomMemberData, currentRoomMemberId):
    currentRoomMemberData.update({userData["userData"]["display_name"] : userData["spotifyData"]})#DATA CANT PARSE??
    currentRoomMemberId.update({userData["userData"]["id"] : userData["userData"]["display_name"]})
    return True
#CreateNewRoom(roomsDB, allRoomsData)
#AddMemberToRoom("Arsalaan", currentRoomCode, currentRoomDB, currentRoomData)

currentRoomMemberData = db.reference("/Rooms/Test/MemberData")
currentRoomId = db.reference("/Rooms/Test/MemberId")


'''
Rooms = db.reference("/Rooms")
print(Rooms.get())
Rooms.update({"N2w Code" : True})
print(Rooms.get())
currentRoomDB.set({"Arsalaan" : True})
'''
