from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    p1 = Post(
        user_id = 2, text_content = "I'm not superstitious, but I am a little stitious.",
        created_at = datetime(2019, 10, 5,9, 45, 10), updated_at = datetime(2019, 10, 5, 9, 45, 10)
        )
    p2 = Post(
        user_id = 1, text_content = "I'm not great at advice. Can I interest you in a sarcastic comment?",
        created_at = datetime(2020, 7, 12, 15, 30, 20), updated_at = datetime(2020, 7, 12, 15, 30, 20)
        )
    p3 = Post(
        user_id = 1, text_content = "I'm not fat. I'm cultivating mass." ,
        created_at = datetime(2020, 11, 14, 8, 5, 45), updated_at = datetime(2020, 11, 14,8, 5, 45)
        )
    p4 = Post(
        user_id = 2, text_content = "I am not a smart man, but I know what love is.",
        created_at = datetime(2021, 3, 28, 18, 20, 50), updated_at = datetime(2021, 3, 28, 18, 20, 50)
        )
    p5 = Post(
        user_id = 3, text_content = "I'm not crazy. My mother had me tested.",
        created_at = datetime(2021, 5, 17, 14, 10, 30), updated_at = datetime(2021, 5, 17, 14, 10, 30)
        )
    p6 = Post(
        user_id = 2, text_content = "Oh, I'm sorry. Did I break your concentration?",
        created_at = datetime(2021, 9, 10, 10, 50, 25), updated_at = datetime(2021, 9, 10, 10, 50, 25)
        )
    p7 = Post(
        user_id = 2, text_content = "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",
        created_at = datetime(2022, 2, 22, 13, 15, 35), updated_at = datetime(2022, 2, 22, 13, 15, 35)
        )
    p8 = Post(
        user_id = 1, text_content = "I'm not going to be ignored, Dan!" ,
        created_at = datetime(2022,7, 6, 16, 40, 15), updated_at = datetime(2022, 7, 6, 16, 40, 15)
        )
    p9 = Post(
        user_id = 2, text_content = "If you're going to quote me, you better get it right. It's 'I'm king of the world!'",
        created_at = datetime(2022, 12, 2, 11, 55, 40), updated_at = datetime(2022, 12, 2, 11, 55, 40)
        )
    p10 = Post(
        user_id = 3, text_content = "I'm not a psychopath, Anderson. I'm a high-functioning sociopath. Do your research.",
        created_at = datetime(2023, 1, 29, 7, 25, 55), updated_at = datetime(2023, 1, 29, 7, 25, 55)
        )

    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
