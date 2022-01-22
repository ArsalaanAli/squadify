import spotipy
from decouple import config

spotipy.Spotify()
CLIENT_ID =config("CLIENT_ID")
CLIENT_SECRET=config("CLIENT_SECRET")
REDIRECT_URI=config("REDIRECT_URI")

def GetAuthManager():
    CACHE_HANDLER = spotipy.cache_handler.CacheFileHandler()
    AUTH_MANAGER = spotipy.oauth2.SpotifyOAuth(scope="user-top-read user-read-private", cache_handler=CACHE_HANDLER, show_dialog=True, client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI)
    return AUTH_MANAGER
def GetAuthURL(AUTH_MANAGER: spotipy.oauth2.SpotifyOAuth):
    return AUTH_MANAGER.get_authorize_url()
def GetTopArtists(oAuthCode):
    AUTH_MANAGER = GetAuthManager()
    AUTH_MANAGER.get_access_token(code=oAuthCode, check_cache=False)
    spotify = spotipy.Spotify(auth_manager=AUTH_MANAGER)
    return spotify.current_user_top_artists(limit=20)