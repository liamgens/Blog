from flask_sqlalchemy import SQLAlchemy

# Database that is used throughout the app
# It is defined here to prevent circular imports
db = SQLAlchemy()

class User(db.Model):

    __tablename__ = 'user'

    username = db.Column(db.String(15), primary_key=True)
    password = db.Column(db.String)
    authenticated = db.Column(db.Boolean, default=False)

    def is_active(self):
        """True, as all users are active."""
        return True

    def get_id(self):
        """Return the email address to satisfy Flask-Login's requirements."""
        return self.username

    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.authenticated

    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False

class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), primary_key=True)
    content = db.Column(db.String)