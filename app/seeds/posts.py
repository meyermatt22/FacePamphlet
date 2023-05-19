from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    p1 = Post(
        user_id = 2, text_content = 'here is post4 by ricky',
        created_at = datetime(2013,3,3,10,10,10), updated_at = datetime(2022,3,3,10,10,10)
        )
    p2 = Post(
        user_id = 1, text_content = 'here is post3 by bubbles',
        created_at = datetime(2015,3,3,10,10,10), updated_at = datetime(2019,3,3,10,10,10)
        )
    p3 = Post(
        user_id = 1, text_content = 'here is post2 by bubbles',
        created_at = datetime(2013,3,3,10,10,10), updated_at = datetime(2018,3,3,10,10,10)
        )
    p4 = Post(
        user_id = 2, text_content = 'here is post1 by ricky',
        created_at = datetime(2009,3,3,10,10,10), updated_at = datetime(2012,3,3,10,10,10)
        )
    p5 = Post(
        user_id = 3, text_content = 'here is post2 by julian, the most recently created post',
        created_at = datetime(2020,3,3,10,10,10), updated_at = datetime(2022,3,3,10,10,10)
        )
    p6 = Post(
        user_id = 2, text_content = 'here is post3 by ricky',
        created_at = datetime(2011,3,3,10,10,10), updated_at = datetime(2015,3,3,10,10,10)
        )
    p7 = Post(
        user_id = 2, text_content = 'here is post2 by ricky',
        created_at = datetime(2010,3,3,10,10,10), updated_at = datetime(2012,3,3,10,10,10)
        )
    p8 = Post(
        user_id = 1, text_content = 'here is post1 by bubbles, the oldest created post',
        created_at = datetime(2000,3,3,10,10,10), updated_at = datetime(2009,3,3,10,10,10)
        )
    p9 = Post(
        user_id = 2, text_content = 'here is post5 by ricky',
        created_at = datetime(2018,3,3,10,10,10), updated_at = datetime(2012,3,3,10,10,10)
        )
    p10 = Post(
        user_id = 3, text_content = 'here is post1 by julian',
        created_at = datetime(2009,3,3,10,10,10), updated_at = datetime(2012,3,3,10,10,10)
        )

    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
