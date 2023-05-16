from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Profile


class NewProfile(FlaskForm):
    bio = StringField("Bio", validators=[DataRequired()])
    date_of_birth = DateField("Date of Birth", validators=[DataRequired()])
    first_name = StringField("Profile First Name", validators=[DataRequired()])
    last_name = StringField("Profile Last Name", validators=[DataRequired()])
    middle_name = StringField("Profile Middle Name", validators=[DataRequired()])
    prof_pic = StringField('Profile Picture')
    background_pic = StringField('Profile Picture')
