from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, ValidationError
from app.models import Profile

def valid_image(form, field):
    prof_pic = field.data
    prof_pic_error = '.png' or '.jpg' not in prof_pic
    if prof_pic_error:
        raise ValidationError('Pictures must be either png or jpg')

def valid_image2(form, field):
    background_pic = field.data
    background_pic_error = '.png' or '.jpg' not in background_pic
    if background_pic_error:
        raise ValidationError('Pictures must be either png or jpg')

class ProfileForm(FlaskForm):
    bio = StringField("Bio", validators=[DataRequired()])
    date_of_birth = DateField("Date of Birth", validators=[DataRequired()])
    first_name = StringField("Profile First Name", validators=[DataRequired()])
    last_name = StringField("Profile Last Name", validators=[DataRequired()])
    middle_name = StringField("Profile Middle Name", validators=[DataRequired()])
    prof_pic = StringField('Profile Picture', validators=[DataRequired()])
    background_pic = StringField('Background Picture', validators=[DataRequired()])
