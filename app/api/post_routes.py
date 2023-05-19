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

@post_routes.route('/<int:id>')
def post(id):
    """ Query for a post by id and returns that song in a dictionary """
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/current')
@login_required
def user_post():
    """ Query for a post owned by the current user """
    post = Post.query.filter(current_user.id == Post.user_id).first()
    return post.to_dict()

@post_routes.route('/new', methods = ['POST'])
@login_required
def add_post():
    """ Handles displaying a new post form on get requests and validating submitted data for songs posts """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        post = Post(
            user_id = current_user.id,
            text_content = form.data['text_content'],
            created_at = form.data['created_at'],
            updated_at = form.data['updated_at'],
        )


        db.session.add(post)
        db.session.commit()
        return post.to_dict()

    return { 'errors': form.errors}
