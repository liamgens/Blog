from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from passlib.apps import custom_app_context as pwd_context

# Database that is used throughout the app
# It is defined here to prevent circular imports
db = SQLAlchemy()


class User(db.Model):
    """
    The database model for a user.
    """

    __tablename__ = 'users'

    username = db.Column(db.String, primary_key=True)
    password = db.Column(db.String)

    def hash_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)


class Post(db.Model):
    """
    The database model for a post.
    """

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30))
    description = db.Column(db.String())
    content = db.Column(db.String)
    image_url = db.Column(db.String)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, title, description, content, image_url):
        self.title = title
        self.description = description
        self.content = content
        self.image_url = image_url
        self.date_posted = datetime.utcnow()

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "content": self.content,
            "image_url": self.image_url,
            "date_posted": self.date_posted
        }
