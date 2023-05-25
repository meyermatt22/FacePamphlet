from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

# comments = db.Table(
#     'comments',
#     db.Model.metadata,
#     db.Column('id', db.Integer, primary_key = True),
#     db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
#     db.Column('posts', db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'))),
#     db.Column('text_content',db.Text, nullable=False),
#     db.Column('created_at',db.DateTime, nullable=False)
# )

# if environment == "production":
#     comments.schema = SCHEMA
class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    post_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('posts.id')))
    text_content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id,
            'textContent': self.text_content,
            'createdAt': self.created_at
        }
