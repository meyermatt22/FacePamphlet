from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post
from datetime import datetime


class PostForm(FlaskForm):
    text_content = StringField("Text Content", validators=[DataRequired()])
    created_at = datetime.now()
    updated_at = datetime.now()
