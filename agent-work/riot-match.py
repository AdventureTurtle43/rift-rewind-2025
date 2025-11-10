import os
import requests

from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("RIOT_API_KEY") or "YOUR_API_KEY_HERE"

REGION = "americas"
BASE_URL = f"https://{REGION}.api.riotgames.com"
HEADERS = {
    "X-Riot-Token": API_KEY
}

def get_puuid(gameName, tagLine):
    url = f"{BASE_URL}/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        print(response.json())
        return response.json()["puuid"]
    else:
        print("Failed to get puuid")
        return []

def get_match_ids(puuid):
    startTime = 1735689600 # start of 2025
    endTime = 1767225599 # end of 2025
    matches = []
    url = f"{BASE_URL}/lol/match/v5/matches/by-puuid/{puuid}/ids"
    start = 0
    while True:
        params = {
            "startTime": startTime,
            "endTime": endTime,
            "type": "ranked",
            "start": start,
            "count": 100,
        }
        response = requests.get(url, headers=HEADERS, params=params)
        if response.status_code != 200:
            print("Failed to get match IDs:", response.status_code, response.text)
            return matches
        data = response.json()
        if not data:
            break
        matches.extend(data)
        start += 100
        break
    print(f"Total matches found: {len(matches)}")
    return matches

def get_match_details(match_id):
    url = f"{BASE_URL}/lol/match/v5/matches/{match_id}"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to get match details:", response.status_code, response.text)
        return None

# george - zhbQf8b4mBFPAXvntru8bpYZ7CJom2q5BigbjhcfzhfJYZJ0AMHfjvQ_jRvK3b4zlDEds5eQevzIqA
def parse_match_details(puuid, match_details):
    is_win = False
    champion_name = None
    role = None
    team_id = None
    enemy_laner_champion = None
    other_enemies = []
    for participant in match_details['info']['participants']:
        if participant['puuid'] == puuid:
            is_win = participant['win']
            champion_name = participant['championName']
            role = participant['teamPosition']
            team_id = participant['teamId']

    for participant in match_details['info']['participants']:
        if participant['teamId'] != team_id:
            if participant['teamPosition'] == role:
                enemy_laner_champion = participant['championName']
            else:
                other_enemies.append(participant['championName'])
    win_string = "won" if is_win else "lost"
    print(f"Player played {champion_name} in the role of {role} and {win_string} against enemy laner {enemy_laner_champion}")

# Example usage
if __name__ == "__main__":
    #gameName = "wxy9ex"
    #tagLine = "NA1"
    #puuid = get_puuid(gameName, tagLine)
    #match_ids = get_match_ids(puuid)
    match_ids = ['NA1_5402673979', 'NA1_5396909305', 'NA1_5396908775', 'NA1_5396898489', 'NA1_5393791556', 'NA1_5393780633', 'NA1_5393765662', 'NA1_5389657215', 'NA1_5389646159', 'NA1_5327845680', 'NA1_5327829474', 'NA1_5313226951', 'NA1_5313206722', 'NA1_5312905401', 'NA1_5312883156', 'NA1_5312869792', 'NA1_5312850282', 'NA1_5312837499', 'NA1_5312823517', 'NA1_5312791542', 'NA1_5312777687', 'NA1_5312765392', 'NA1_5310308135', 'NA1_5307164129', 'NA1_5307150092', 'NA1_5307138821', 'NA1_5306649487', 'NA1_5306640727', 'NA1_5306616738', 'NA1_5306594832', 'NA1_5306500331', 'NA1_5306484371', 'NA1_5306377205', 'NA1_5301987744', 'NA1_5301970625', 'NA1_5301956559', 'NA1_5301938514', 'NA1_5234817688', 'NA1_5230663150', 'NA1_5225332665', 'NA1_5215819622', 'NA1_5207186643']
    enemyLanerToWins = {} #string : int
    enemyToWins = {}
    print("Recent match IDs:", match_ids)
    for match in match_ids:
        match_details = get_match_details(match_ids[0])
    parse_match_details('', match_details)

