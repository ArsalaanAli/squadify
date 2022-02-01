from flask import Flask, session, request
import os
import spotipy
import spotifyAuth
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
        print(userData)
        session["userData"] = {"userData" : userData}
        return {"userData": userData}
    return session["userData"]

@app.route('/api/getSpotifyData')
def GetSpotifyData():
    print("1")
    if not session.get("topArtists"):
        print("2")
        userData = spotifyAuth.GetTopArtists()
        print(userData)
        session["topArtists"] = {"spotifyData": userData}
        return {"spotifyData": userData}
    print("3")
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
    return {"roomData" : data}