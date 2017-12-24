from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Database that is used throughout the app
# It is defined here to prevent circular imports
db = SQLAlchemy()


class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30))
    content = db.Column(db.String)
    image_url = db.Column(db.String)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, title, content, image_url):
        self.title = title
        self.content = content
        self.image_url = image_url
        self.date_posted = datetime.utcnow()

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "image_url": self.image_url,
            "date_posted": self.date_posted
        }
