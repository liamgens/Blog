from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import SQLALCHEMY_DATABASE_URI
from models import db, Post
from flask_login import LoginManager, login_required

# Creates the basic Flask app
app = Flask(__name__)
# Initializes the app to use the database URI
# app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
# Hide the weird Flask warning messages
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database created in models in the app's context
with app.app_context():
    db.init_app(app)
    db.create_all()

# Create the login manager for handling users
login_manager = LoginManager(app)

# Basic Flask route
@app.route('/')
def index():
    posts = []
    for i in range(0, 10):
        title = "Summer of Tinder - Week %i" % i
        posts.append(Post(title=title))

    return render_template("index.html", navigation=posts)

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/new_post')
def new_post():
    return render_template("new_post.html")

@app.route('/posts/<id>')
def posts(id):

    # Fetch the post from the database and insert it into the template

    return render_template("post.html")

@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve
    """
    return User.query.get(user_id)


# Runs the app (in debug mode)
if __name__ == "__main__":
    app.run(debug=True)
