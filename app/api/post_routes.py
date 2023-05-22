from flask import Blueprint, request
from app.models import Post, db
from flask_login import current_user, login_required
from app.forms.post_form import PostForm
from app.forms.post_edit_form import PostEditForm

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

@post_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    """ Handles editing a post's details if the song owner is the logged in user """
    post = Post.query.get(id)

    if not post:
        return {"error": "Post not found."}

    form = PostEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        post.text_content = form.data['text_content']
        # post.created_at = form.data['created_at']
        # post.updated_at = form.data['updated_at']

        # print('post edit route info =====> ', post.text_content)
        # print('post edit route info =====> ', post.created_at)
        # print('post edit route info =====> ', post.updated_at)

        db.session.commit()
        return post.to_dict()

    return { 'errors': form.errors}

@post_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    """ Handles deleting a post by id, if owned by current user """
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return "Delete Successful"
    else:
        return 'Must be post owner to delete post'
