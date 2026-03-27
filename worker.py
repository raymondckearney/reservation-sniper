import time
from datetime import datetime
from database import SessionLocal
from models import Target
from checker_resy import check_resy
from venues import VENUES

def run():
    while True:
        db = SessionLocal()
        targets = db.query(Target).all()

        for t in targets:
            venue_id = VENUES.get(t.name)
            if not venue_id:
                continue

            available, times = check_resy(venue_id, t.date, t.party_size)

            if available:
                print(f"🔥 {t.name} available: {times}")

        time.sleep(30)

if __name__ == "__main__":
    run()
