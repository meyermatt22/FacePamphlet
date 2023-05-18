from flask import Blueprint, request
from app.models import Profile, db
from flask_login import current_user, login_required
# from forms.profile_form import ProfileForm
from app.forms.profile_form import ProfileForm
# from app.forms.profile_edit_form import ProfileEditForm
from .profile_routes import ProfileEditForm
# from ..forms.profile_edit_form import ProfileEditForm


profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('')
def profiles():
    """ Query for all profiles and return them in a list of dictionaries """
    print('==========> all prof route')
    profiles = Profile.query.all()
    return { 'profiles': [prof.to_dict() for prof in profiles]}

@profile_routes.route('/current')
@login_required
def user_profile():
    """ Query for a profile owned by the current user """
    profile = Profile.query.filter(current_user.id == Profile.user_id).first()
    return profile.to_dict()

@profile_routes.route('/new', methods = ['POST'])
@login_required
def add_profile():
    """ Handles displaying a new post form on get requests and validating submitted data for songs posts """
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("prof form info in routes ===> ", form)

    if form.validate_on_submit():

        print('================> background pic deets:', form.data['background_pic'])

        profile = Profile(
            user_id = current_user.id,
            first_name = form.data['first_name'],
            last_name = form.data['last_name'],
            middle_name = form.data['middle_name'],
            prof_pic = form.data['prof_pic'],
            background_pic = form.data['background_pic'],
            date_of_birth = form.data['date_of_birth'],
            bio = form.data['bio'],
        )


        db.session.add(profile)
        db.session.commit()
        return profile.to_dict()

    return { 'errors': form.errors}

@profile_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    """ Handles editing a profile's details if the song owner is the logged in user """
    prof = Profile.query.get(id)
    if not prof:
        return {"error": "Profile not found."}

    form = ProfileEditForm()
