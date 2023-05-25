from flask import Blueprint, request
from app.models import Comment, Post, db
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('')
def comments():
    """ Query for all comments and return them in a list of dictionaries """
    comments = Comment.query.all()
    return { 'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/<int:id>')
def comment(id):
    """ Query for a comment by id and returns that song in a dictionary """
    comment = Comment.query.get(id)
    return comment.to_dict()

@comment_routes.route('/current')
@login_required
def user_comment():
    """ Query for a comment owned by the current user """
    comment = Comment.query.filter(current_user.id == Comment.user_id).first()
    return comment.to_dict()

@comment_routes.route('/new', methods = ['POST'])
@login_required
def add_comment():
    """ Handles displaying a new comment form on get requests and validating submitted data for songs comments """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # post = Post.query.get(id)

    # print('create comment route -==========> : ' ,post)

    if form.validate_on_submit():

        comment = Comment(
            user_id = current_user.id,
            post_id = form.data['post_id'],
            text_content = form.data['text_content'],
            created_at = datetime.now()
        )


        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

    return { 'errors': form.errors}

@comment_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    """ Handles deleting a comment by id, if owned by current user """
    comment = Comment.query.get(id)
    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return "Delete Successful"
    else:
        return 'Must be comment owner to delete comment'
