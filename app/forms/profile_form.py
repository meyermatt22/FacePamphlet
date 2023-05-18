from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, ValidationError
from app.models import Profile


class ProfileForm(FlaskForm):
    bio = StringField("Bio", validators=[DataRequired()])
    date_of_birth = DateField("Date of Birth")
    first_name = StringField("Profile First Name", validators=[DataRequired()])
    last_name = StringField("Profile Last Name", validators=[DataRequired()])
    middle_name = StringField("Profile Middle Name", validators=[DataRequired()])
    prof_pic = StringField('Profile Picture')
    background_pic = StringField('Background Picture')
