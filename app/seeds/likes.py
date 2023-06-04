from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    l1 = Like(
        user_id = 1, post_id = 1, status = True
    )
    l2 = Like(
        user_id = 1, post_id = 2, status = True
    )
    l3 = Like(
        user_id = 1, post_id = 3, status = True
    )
    l4 = Like(
        user_id = 2, post_id = 4, status = True
    )
    l5 = Like(
        user_id = 2, post_id = 1, status = True
    )
    l6 = Like(
        user_id = 2, post_id = 7, status = True
    )
    l7 = Like(
        user_id = 3, post_id = 1, status = True
    )

    db.session.add_all([l1, l2, l3, l4, l5, l6, l7])
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
