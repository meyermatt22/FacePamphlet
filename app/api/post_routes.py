from flask import Blueprint, request
from app.models import Post, db
from flask_login import current_user, login_required
from app.forms.post_form import PostForm


post_routes = Blueprint('posts', __name__)

@post_routes.route('')
def posts():
    """ Query for all posts and return them in a list of dictionaries """
    posts = Post.query.all()
    return { 'posts': [post.to_dict() for post in posts]}
