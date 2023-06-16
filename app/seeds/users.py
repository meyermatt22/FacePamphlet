from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    bubbles = User(
        username='Bubbles', email='bubbles@aa.io', password='password')
    ricky = User(
        username='ricky', email='ricky@aa.io', password='password')
    julian = User(
        username='julian', email='julian@aa.io', password='password')
    u4 = User(
        username='jessica', email='jessica@aa.io', password='password')
    u5 = User(
        username='doctor', email='doctor@aa.io', password='password')
    u6 = User(
        username='walter', email='walter@aa.io', password='password')
    u7 = User(
        username='dumbledorable', email='dumbledorable@aa.io', password='password')
    u8 = User(
        username='phoebesmelltcat', email='phoebesmelltcat@aa.io', password='password')
    u9 = User(
        username='swanson', email='swanson@aa.io', password='password')
    u10 = User(
        username='lucille', email='lucille@aa.io', password='password')
    u11 = User(
        username='leslie', email='leslie@aa.io', password='password')
    u12 = User(
        username='robert', email='robert@aa.io', password='password')

    db.session.add_all([bubbles, ricky, julian, u4, u5,u6,u7,u8,u9,u10,u11,u12])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
