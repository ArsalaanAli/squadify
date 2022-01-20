from flask import Flask, session, request
import os
import spotipy
import spotifyAuth
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


@app.route('/api/getSpotifyData')
def GetSpotifyData():
    AUTH_MANAGER = spotifyAuth.GetAuthManager()
    AUTH_MANAGER.get_access_token(session["oAuthCode"])
    spotify = spotipy.Spotify(auth_manager=AUTH_MANAGER)
    userData = spotify.current_user_top_artists(limit=20)
    print(spotify.current_user())
    session["topArtists"] = userData["items"]
    print(userData["items"])
    return {"userData": userData}
