from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text

def seed_friends():
    re1 = Friend(
        user1_id = 1, user_id = 2, status = 'friends'
    )
    re2 = Friend(
        user1_id = 1, user_id = 3, status = 'friends'
    )

    db.session.add_all([re1, re2])
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))

    db.session.commit()
