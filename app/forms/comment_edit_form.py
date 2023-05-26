from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField, DateTimeField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment
from datetime import datetime

class CommentEditForm(FlaskForm):
    text_content = StringField("Text Content", validators=[DataRequired()])
