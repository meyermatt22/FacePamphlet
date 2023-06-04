from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    post_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('posts.id')))
    status = db.Column(db.Boolean, default=False)


    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id,
            'textContent': self.status
        }
