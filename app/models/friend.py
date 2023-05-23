from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    user2_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    status = db.Column(db.Enum('pending', 'accepted', 'declined'))


    def to_dict(self):
        return {
            'id': self.id,
            'user1Id': self.user1_id,
            'user2Id': self.user2_id,
            'status': self.status
        }

# friends = db.Table(
#     'friends',
#     db.Model.metadata,
#     db.Column()
# )
