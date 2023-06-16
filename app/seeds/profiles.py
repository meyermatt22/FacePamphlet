from app.models import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, date

def seed_profiles():
    bubbles = Profile(
        user_id = 1,
        bio =  "I'm Bubbles, the animal lover & DIY expert of Sunnyvale Trailer Park. Looking for a kind soul to share my passion for fixing carts & singing songs about kitties. Let's build a home on wheels!",
        date_of_birth = datetime(1972,8,3,10,10,10),
        first_name = 'Bubbles', last_name = 'Harnis', middle_name = 'Conky',
        prof_pic = 'https://i.imgur.com/YDGFIfh.jpg',
        background_pic = 'https://i.imgur.com/ERa9eO9.jpg'
    )
    ricky = Profile(
        user_id = 2,
        bio = "Hey, I'm Ricky! Proud resident of Sunnyvale Trailer Park & the 'king of idiots.' Looking for someone who appreciates my unique thinking & ability. Let's live the sweet life!",
        date_of_birth = datetime(1971,5,3,10,10,10),
        first_name = 'Richard', last_name = 'LaFleur', middle_name = 'Ricky',
        prof_pic = 'https://i.imgur.com/fgh67qA.jpg',
        background_pic = 'https://i.imgur.com/fN61CyY.jpg'
    )
    julian = Profile(
        user_id = 3,
        bio = "I'm Julian, the cool resident of Sunnyvale Trailer Park. Seeking a partner who knows the value of a well-planned scheme & a perfectly mixed rum and coke. Let's navigate the park together!",
        date_of_birth = datetime(1973,10,12,10,10,10),
        first_name = 'Julian', last_name = 'Jules', middle_name = 'Tremblay',
        prof_pic = 'https://i.imgur.com/2RxbAan.jpg',
        background_pic = 'https://i.imgur.com/z6sJXm4.jpg'
    )
    u4 = Profile(
        user_id = 4,
        bio = "Professional toon, lover of red dresses and carrot juice. Looking for a partner to share wacky adventures and sing 'Why Don't You Do Right?' with. Hoppin' around since '97!",
        date_of_birth = datetime(1997,5,5,0,0,0),
        first_name = 'Jessica', last_name = 'Rabbit', middle_name = 'Trouble',
        prof_pic = 'https://i.imgur.com/UuMVN1k.jpg',
        background_pic = 'https://i.imgur.com/6pXFN6A.jpg'
    )
    u5 = Profile(
        user_id = 5,
        bio =  "Time-traveling enthusiast with a knack for saving the universe. If you're up for exploring space and time in a blue police box, let's embark on a journey of wibbly-wobbly fun!",
        date_of_birth = datetime(1058,10,9,10,10,10),
        first_name = 'The', last_name = 'Doctor', middle_name = 'Good',
        prof_pic = 'https://i.imgur.com/nEFkXDa.jpg',
        background_pic = 'https://i.imgur.com/UDfu6iX.jpg'
    )
    u6 = Profile(
        user_id = 6,
        bio =   "High school chemistry teacher turned legendary methamphetamine cook. Looking for someone who appreciates the chemistry of life. Let's cook up some unforgettable moments together!",
        date_of_birth = datetime(1965,9,7,0,0,0),
        first_name = 'Walter', last_name = 'White', middle_name = 'Danger',
        prof_pic = 'https://i.imgur.com/jkFO17o.jpg',
        background_pic = 'https://i.imgur.com/bmnkylx.jpg'
    )
    u7 = Profile(
        user_id = 7,
        bio =   "Wise and witty wizard seeking magical connections. If you're a fan of butterbeer, quidditch, and enchanting conversations, join me in exploring the secrets of Hogwarts and beyond!",
        date_of_birth = datetime(1957,7,1,0,0,0),
        first_name = 'Albus', last_name = 'Dumbledore', middle_name = 'Brian',
        prof_pic = 'https://i.imgur.com/aU7mAmy.jpg',
        background_pic = 'https://i.imgur.com/LfsDt5v.jpg'
    )
    u8 = Profile(
        user_id = 8,
        bio =   "Singer-songwriter with a unique style and a love for smelly cats. Looking for someone who can appreciate my offbeat charm and enjoy impromptu Central Perk jam sessions!",
        date_of_birth = datetime(1968,2,9,0,0,0),
        first_name = 'Pheobe', last_name = 'Buffay', middle_name = 'Buffy',
        prof_pic = 'https://i.imgur.com/no6qrrC.jpg',
        background_pic = 'https://i.imgur.com/6WsGRvV.jpg'
    )
    u9 = Profile(
        user_id = 9,
        bio =   "Proud mustache enthusiast and meat connoisseur. Seeking someone who appreciates the simple pleasures in life: woodworking, breakfast food, and embracing the Swanson way!",
        date_of_birth = datetime(1970,3,5,0,0,0),
        first_name = 'Ronald', last_name = 'Swanson', middle_name = 'donald',
        prof_pic = 'https://i.imgur.com/sXoPDNp.jpg',
        background_pic = 'https://i.imgur.com/GUnu6vP.jpg'
    )
    u10 = Profile(
        user_id = 10,
        bio =   "Socialite with a knack for one-liners and a love for martinis. Looking for someone who can handle my sass and join me in navigating the hilariously dysfunctional world of the Bluth family!",
        date_of_birth = datetime(1952,5,2,0,0,0),
        first_name = 'Lucille', last_name = 'Bluth', middle_name = 'devile',
        prof_pic = 'https://i.imgur.com/WJNWCOj.jpg',
        background_pic = 'https://i.imgur.com/STVUaLL.jpg'
    )
    u11 = Profile(
        user_id = 11,
        bio =    "Passionate government official with a love for waffles and fierce determination. Seeking someone who shares my enthusiasm for public service and is ready to join my campaign for Pawnee!",
        date_of_birth = datetime(1975,1,8,0,0,0),
        first_name = 'Leslie', last_name = 'Knope', middle_name = 'Neversay',
        prof_pic = 'https://i.imgur.com/zBwa01F.jpg',
        background_pic = 'https://i.imgur.com/pxlsFg3.jpg'
    )
    u12 = Profile(
        user_id = 12,
        bio =     "Optimistic and bubbly sea sponge seeking a partner to explore the underwater wonders of Bikini Bottom. If you're up for jellyfishing and Krusty Krab adventures, let's dive in!",
        date_of_birth = datetime(1998,7,4,0,0,0),
        first_name = 'Sponge', last_name = 'Squarepants', middle_name = 'Bob',
        prof_pic = 'https://i.imgur.com/K9QFv3R.jpg',
        background_pic = 'https://i.imgur.com/05DY9Wp.jpg'
    )

    db.session.add_all([bubbles, ricky, julian,u4, u5,u6,u7,u8,u9,u10,u11,u12])
    db.session.commit()


def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))

    db.session.commit()
