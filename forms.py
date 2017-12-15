from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import Email, DataRequired
from wtforms.widgets import TextArea



class SignupForm(FlaskForm):
    email = StringField('email', 
                validators=[DataRequired(),Email()])
    password = PasswordField(
                'password', 
                validators=[DataRequired()])
    submit = SubmitField("Sign In")


class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    content = TextAreaField('content', widget=TextArea(), validators=[DataRequired()])
    submit = SubmitField("Post")