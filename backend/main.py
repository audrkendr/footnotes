import spotipy
from spotipy.oauth2 import SpotifyOAuth
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT_ID = "f63d88cbca24467aa020d9b4f2a12165"
CLIENT_SECRET = "b5971812b1e6426cabbf7336749c05ec"
REDIRECT_URI = "http://127.0.0.1:8000/callback"


@app.get("/top-tiles")
def get_tiles():
    #print("** Initializing Spotify Auth **")
    sp_oauth = SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URI,
        scope="user-top-read",
        open_browser=True,
        show_dialog=True
    )

    try:
        #print("** Checking for token... **")
        token_info = sp_oauth.get_cached_token()
        
        if not token_info:
            #print("** No token found! Generating auth URL **")
            auth_url = sp_oauth.get_authorize_url()
            #print(f"** PLEASE OPEN THIS URL MANUALLY: {auth_url} **")
            return {"error": "Authentication required", "url": auth_url}

        sp = spotipy.Spotify(auth=token_info['access_token'])
        
        #print("** Grabbing top tracks... **")
        results = sp.current_user_top_tracks(limit=12, time_range='short_term')
        
        tracks = []
        for item in results['items']:
            tracks.append({
                "track_name": item['name'],
                "artist_name": item['artists'][0]['name'],
                "album_art": item['album']['images'][0]['url'],
                "external_url": item['external_urls']['spotify'] # <** CRITICAL LINE
            })
                
        #print(f"** Found {len(tracks)} tracks! **")
        return tracks

    except Exception as e:
        #print(f"** CRITICAL ERROR: {str(e)} **")
        return {"error": str(e)}

@app.get("/callback")
def callback(code: str):
    print(f"** Callback received. Code: {code[:10]}... **")
    return "Login successful! You can now refresh your React app."