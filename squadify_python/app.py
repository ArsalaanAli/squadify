from flask import Flask, session, request
import os
import spotipy
import spotifyAuth
import spotifyDataParser
import FirebaseFunctions
import random
import firebase_admin
from firebase_admin import db
app =  Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'



@app.route('/api')
def GetAuthURL():
    AUTH_MANAGER = spotifyAuth.GetAuthManager()
    AUTH_URL = {"url": spotifyAuth.GetAuthURL(AUTH_MANAGER)}
    return AUTH_URL

@app.route('/api/sendCode', methods=["POST"])
def HandleCodeRequest():
    recievedCode = request.get_json()
    session["oAuthCode"] = recievedCode["code"]
    spotifyAuth.GetSpotifyToken(session["oAuthCode"])
    return {"done": "done"}

@app.route('/api/checkLoggedIn')
def LoggedIn():
    if session.get("oAuthCode"):
        return {"state": True}
    return {"state": False}

@app.route('/api/getUserData')
def GetUserData():
    if not session.get("userData"):
        userData = spotifyAuth.GetUserData()
        session["userData"] = userData
        return userData
    return session["userData"]

@app.route('/api/sendUserDataToDatabase', methods=["POST"])
def sendDataToDatabase():
    userData = request.get_json()
    currentRoomMemberData = db.reference("/Rooms/" + userData["roomCode"] + "/MemberData")
    currentRoomMemberId = db.reference("/Rooms/" + userData["roomCode"] + "/MemberId")
    FirebaseFunctions.AddUserToRoom(userData=userData, currentRoomMemberData=currentRoomMemberData, currentRoomMemberId=currentRoomMemberId)
    return {"done" : "done"}

@app.route('/api/getSpotifyData')
def GetSpotifyData():
    if not session.get("topArtists"):
        userData = spotifyAuth.GetTopArtists()
        session["topArtists"] = userData
        return userData
    return session["topArtists"]

@app.route('/api/createRoom')
def CreateRoom():
    roomsDB = db.reference("/Rooms")
    if not session.get("RoomsData"):
        session["RoomsData"] = roomsDB.get(shallow=True)
    NewCode = FirebaseFunctions.CreateNewRoom(roomsDB, session["RoomsData"])
    return {"RoomCode" : NewCode}

@app.route('/api/getRoomData', methods=["POST"])
def GetMembers():
    recievedCode = request.get_json()
    data = db.reference("/Rooms/" + recievedCode["RoomCode"]).get()
    print(data)
    return data

@app.route('/api/analyzeRoomData', methods=["POST"])
def AnalyzeRoomData():
    roomData = request.get_json()
    parsedData = spotifyDataParser.ParseRoomData(roomData["roomData"])
    return parsedData