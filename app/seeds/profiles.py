from app.models import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_profiles():
    bubbles = Profile(
        user_id = 1,
        bio = 'i love kitties and bubbles',
        date_of_birth = datetime(2012,3,3,10,10,10),
        first_name = 'Bubbles', last_name = 'Harnis', middle_name = 'Conky',
        prof_pic = 'https://i.imgur.com/YDGFIfh.jpg',
        background_pic = 'https://i.imgur.com/ERa9eO9.jpg'
    )
    ricky = Profile(
        user_id = 2,
        bio = "The most important thing is to enjoy your life ; to be happy ; its all that matters.",
        date_of_birth = datetime(2012,3,3,10,10,10),
        # datetime.now()
        first_name = 'Richard', last_name = 'LaFleur', middle_name = 'Ricky',
        prof_pic = 'https://i.imgur.com/fgh67qA.jpg',
        background_pic = 'https://i.imgur.com/fN61CyY.jpg'
    )
    julian = Profile(
        user_id = 3,
        bio = '',
        date_of_birth = datetime(2012,3,3,10,10,10),
        first_name = 'Julian', last_name = 'Jules', middle_name = 'Tremblay',
        prof_pic = 'https://i.imgur.com/2RxbAan.jpg',
        background_pic = 'https://i.imgur.com/z6sJXm4.jpg'
    )

    db.session.add_all([bubbles, ricky, julian])
    db.session.commit()


def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))

    db.session.commit()
