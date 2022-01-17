from flask import Flask
import spotipy
import spotifyAuth
app =  Flask(__name__)

@app.route('/api')
def index():
    AUTH_MANAGER = spotifyAuth.GetAuthManager()
    AUTH_URL = spotifyAuth.GetAuthURL(AUTH_MANAGER)
    return AUTH_URL
