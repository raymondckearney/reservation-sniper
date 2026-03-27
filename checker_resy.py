import requests
import os

API_KEY = os.getenv("RESY_API_KEY")

def check_resy(venue_id, date, party_size):
    url = "https://api.resy.com/4/find"

    headers = {
        "Authorization": f"ResyAPI api_key={API_KEY}",
        "User-Agent": "Mozilla/5.0"
    }

    params = {
        "day": date,
        "party_size": party_size,
        "venue_id": venue_id
    }

    r = requests.get(url, headers=headers, params=params)

    if r.status_code != 200:
        return False, []

    data = r.json()
    slots = []

    for result in data.get("results", []):
        for slot in result.get("slots", []):
            slots.append(slot.get("time"))

    return len(slots) > 0, slots
