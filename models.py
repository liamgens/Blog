from flask_sqlalchemy import SQLAlchemy

# Database that is used throughout the app
# It is defined here to prevent circular imports
db = SQLAlchemy()

class User(db.Model):

    __tablename__ = 'users'

    email = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String)
    authenticated = db.Column(db.Boolean, default=False)


    def __init__(self, email, password):
        self.email = email
        self.password = password

    def is_active(self):
        """True, as all users are active."""
        return True

    def get_id(self):
        """Return the email address to satisfy Flask-Login's requirements."""
        return self.email

    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.authenticated

    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False

class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30))
    content = db.Column(db.String)
    image_url = db.Column(db.String)

    def __init__(self, title, content, image_url):
        self.title = title
        self.content = content
        self.image_url = image_url

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "image_url": self.image_url
        }
