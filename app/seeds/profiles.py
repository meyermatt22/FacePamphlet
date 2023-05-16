from app.models import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text

def seed_profiles():
    bubbles = Profile(
        bio = 'i love kitties and bubbles',
        date_of_birth = 'Tue May 16 2023 18:01:02 GMT-0500 (Central Daylight Time)',
        first_name = 'Bubbles', last_name = 'Harnis', middle_name = 'Conky',
        prof_pic = 'https://i.imgur.com/YDGFIfh.jpg',
        background_pic = 'https://i.imgur.com/ERa9eO9.jpg'
    )
    ricky = Profile(
        bio = "The most important thing is to enjoy your life ; to be happy ; its all that matters.",
        date_of_birth = 'Tue May 16 2023 18:01:02 GMT-0500 (Central Daylight Time)',
        first_name = 'Richard', last_name = 'LaFleur', middle_name = 'Ricky',
        prof_pic = 'https://i.imgur.com/fgh67qA.jpg',
        background_pic = 'https://i.imgur.com/fN61CyY.jpg'
    )
    julian = Profile(
        bio = '',
        date_of_birth = 'Tue May 16 2023 18:01:02 GMT-0500 (Central Daylight Time)',
        first_name = 'Julian', last_name = 'Jules', middle_name = 'Tremblay',
        prof_pic = 'https://i.imgur.com/2RxbAan.jpg',
        background_pic = 'https://i.imgur.com/z6sJXm4.jpg'
    )

    profs_list = [bubbles, ricky, julian]

    for prof in profs_list:
        db.session.add(prof)
        db.session.commit()


def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))

    db.session.commit()
