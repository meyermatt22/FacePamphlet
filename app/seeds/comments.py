from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    c1 = Comment(
        user_id = 1, post_id = 1,
        text_content = "Kitties are so cute. They're like little fluffy balls of love that poop in a box.",
        created_at = datetime(2022,3,3,10,10,10)
    )
    c2 = Comment(
        user_id = 2, post_id = 1,
        text_content = "I'm not a pessimist, I'm an optometrist.",
        created_at = datetime(2022,3,4,10,10,10)
    )
    c3 = Comment(
        user_id = 3, post_id = 1,
        text_content = "It's not rocket appliances.",
        created_at = datetime(2022,3,5,10,10,10)
    )
    c4 = Comment(
        user_id = 2, post_id = 1,
        text_content = "Worst case Ontario...",
        created_at = datetime(2022,3,3,10,50,10)
    )
    c5 = Comment(
        user_id = 3, post_id = 2,
        text_content = "I'm not the kind of person to say 'Atodaso,' but you know what? Atodaso. I .... atodaso.",
        created_at = datetime(2022,3,3,10,10,10)
    )
    c6 = Comment(
        user_id = 2, post_id = 2,
        text_content = "I'm not drunk, I'm just drinkin'.",
        created_at = datetime(2022,4,3,10,10,10)
    )
    c7 = Comment(
        user_id = 3, post_id = 2,
        text_content = "I'm not a book expert, but I know a lot about literature.",
        created_at = datetime(2022,2,3,10,10,10)
    )
    c8 = Comment(
        user_id = 1, post_id = 5,
        text_content = "I'm just here to feed the kitties and do the best I can, you know? Just trying to keep everything in balance.",
        created_at = datetime(2022,3,3,10,10,10)
    )
    c9 = Comment(
        user_id = 2, post_id = 5,
        text_content = "Just because you're paranoid doesn't mean they're not out to get you.",
        created_at = datetime(2022,3,3,11,10,10)
    )
    c10 = Comment(
        user_id = 3, post_id = 4,
        text_content = "It's like the way she goes, sometimes she goes, sometimes it doesn't. It didn't go. That's the way she goes.",
        created_at = datetime(2022,3,3,10,10,10)
    )

    db.session.add_all([c1, c2, c3, c4, c5, c6, c7, c8, c9, c10])
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
