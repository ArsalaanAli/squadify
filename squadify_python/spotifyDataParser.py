'''
data breakdown
external_urls : {'spotify': link}
followers : {'href': None, 'total': 289259}
genres : ['emo rap', 'pop rap', 'sad rap']
images : [{'height': 640, 'url': 'https://i.scdn.co/image/ab6761610000e5eb8f043df9a877a61c78f4c480', 'width': 640}]
name : Aries
popularity : 68
uri : spotify:artist:3hOdow4ZPmrby7Q1wfPLEy - takes you to artists page in spotify app
'''
#pretentious hipster : lowest popularity
#basic bitch : highest popularity
#emo : most sad genres
#k-pop stan : most kpop artists
#weeb : most japanese artists
def GetSquadifyValues(spotifyData: list):
    sadness = 0
    kpop = 0
    weeb = 0
    popularity = 0
    for artist in spotifyData:
        print(artist["name"])
        for genre in artist["genres"]:
            genreWords = genre.split()
            if genre == "slowed and reverb" or any(x in genreWords for x in ['emo', 'sad']):
                sadness+=1
            if any(x in genreWords for x in ['k-pop', 'korean']):
                kpop+=1
            if any(x in genreWords for x in ['j-pop', 'japanese', "anime"]):
                weeb+=1
        popularity += artist["popularity"]
    return [popularity, sadness, kpop, weeb]