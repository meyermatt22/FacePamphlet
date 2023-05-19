from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post


class PostForm(FlaskForm):
    text_content = StringField("Text Content", validators=[DataRequired()])
    created_at = DateField("Created At")
    updated_at = DateField("Updated At")
