from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post
from datetime import datetime


class PostEditForm(FlaskForm):
    text_content = StringField("Text Content", validators=[DataRequired()])
    created_at = DateField('Date', format='%m-%d-%Y', default=datetime.now())
    updated_at = DateField('Date', format='%m-%d-%Y', default=datetime.now())
