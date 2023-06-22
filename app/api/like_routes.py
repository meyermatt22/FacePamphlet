from flask import Blueprint, request
from app.models import Like, db
from flask_login import current_user, login_required
from app.forms.like_form import LikeForm

like_routes = Blueprint('likes', __name__)

@like_routes.route('')
def likes():
    """ Query for all likes and return them in a list of dictionaries """
    likes = Like.query.all()
    return { 'likes': [like.to_dict() for like in likes]}

@like_routes.route('/<int:id>')
def like(id):
    """ Query for a like by id and returns that song in a dictionary """
    like = Like.query.get(id)
    return like.to_dict()

@like_routes.route('/current')
@login_required
def user_like():
    """ Query for all likes owned by the current user """
    likes = Like.query.filter(current_user.id == Like.user_id).all()
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/like', methods=['POST'])
@login_required
def add_like():
    """ Handles posting a new like """
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        like = Like (
            user_id = current_user.id,
            post_id = form.data['post_id'],
            status = True
        )
        db.session.add(like)
        db.session.commit()
        return like.to_dict()
    return { 'errors': form.errors}


@like_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_like(id):
    """ Handles deleting a like by id, if owned by the current user """
    like = Like.query.get(id)
    if like.user_id == current_user.id:
        db.session.delete(like)
        db.session.commit()
        return "Delete Successful"
    else:
        return "Must be like owner to delete like"
