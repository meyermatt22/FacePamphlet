from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    bio = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date, nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    middle_name = db.Column(db.String(30))
    prof_pic = db.Column(db.Text)
    background_pic = db.Column(db.Text)

    # user = db.relationship('User', back_populates='profiles')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'bio': self.bio,
            'dateOfBirth': self.date_of_birth,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'middleName': self.middle_name,
            'profPic': self.prof_pic,
            'backgroundPic': self.background_pic
        }
