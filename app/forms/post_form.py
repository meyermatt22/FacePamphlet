from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post
from datetime import datetime


class PostForm(FlaskForm):
    text_content = StringField("Text Content", validators=[DataRequired()])
    created_at = DateTimeField('Date', format='%m-%d-%Y', default=datetime.now())
    updated_at = DateField('Date', format='%m-%d-%Y', default=datetime.now())
