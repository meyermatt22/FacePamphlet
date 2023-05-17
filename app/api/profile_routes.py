from flask import Blueprint, request
from app.models import Profile, db
from flask_login import current_user, login_required
# from forms.profile_form import ProfileForm


profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('')
def profiles():
    """ Query for all profiles and return them in a list of dictionaries """
    print('==========> all prof route')
    profiles = Profile.query.all()
    return { 'profiles': [prof.to_dict() for prof in profiles]}

@profile_routes.route('/current')
def user_profile():
    """ Query for a profile owned by the current user """
    profile = Profile.query.filter(current_user.id == Profile.user_id).first()
    return profile.to_dict()
