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
    return {"done": "done"}

@app.route('/api/checkLoggedIn')
def LoggedIn():
    if session.get("oAuthCode"):
        return {"state": True}
    return {"state": False}
@app.route('/api/getSpotifyData')
def GetSpotifyData():
    if not session.get("topArtists"):
        userData = spotifyAuth.GetTopArtists(session["oAuthCode"])
        session["topArtists"] = {"userData": userData}
        return {"userData": userData}
    return session["topArtists"]


@app.route('/api/createRoom')
def CreateRoom():
    roomsDB = db.reference("/Rooms")
    if not session.get("RoomsData"):
        session["RoomsData"] = roomsDB.get(shallow=True)
    NewCode = FirebaseFunctions.CreateNewRoom(roomsDB, session["RoomsData"])
    return {"RoomCode" : NewCode}

@app.route('/api/getMembers', methods=["POST"])
def GetMembers():
    recievedCode = request.get_json()
    data = db.reference("/Rooms/" + recievedCode["RoomCode"] + "/Members").get()
    print(data)
    return {"memberData" : data}