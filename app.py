from flask import Flask, jsonify, render_template, request, redirect, url_for, Markup, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from config import SQLALCHEMY_DATABASE_URI
from models import db, Post, User
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from forms import SignupForm, PostForm
import markdown
from passlib.hash import sha256_crypt
import os


app = Flask(__name__)

# Initializes the app to use the database URI
# app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
# Hide the weird Flask warning messages
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'

# Initialize the database created in models in the app's context
with app.app_context():
    db.init_app(app)
    db.create_all()

# Create the login manager for handling users
login_manager = LoginManager(app)


@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts = [i.serialize() for i in posts]
    return jsonify(posts) if posts else jsonify([])


@app.route('/posts/new', methods=['POST'])
def new_post():
    data = request.get_json()
    post = Post(data.get('title'), data.get('content'), data.get('image_url'))
    db.session.add(post)
    db.session.commit()
    return jsonify(post.id)


@app.route('/posts/<id>', methods=['GET'])
def posts(id):
    post = Post.query.filter_by(id=id).first()
    return jsonify(post.serialize()) if post else jsonify([])

# @app.route('/posts/<id>', methods=['GET'])
# def get(id):
#     return jsonify({"content": "#Heading"})
    # return send_from_directory(filename="tests.md", directory="./posts_markdown/")

# @app.route('/posts/new', methods=['GET', 'POST'])
# def new_post():
#     post = PostForm()

#     if request.method == 'GET':
#         return render_template('new_post.html', form=post)

#     elif request.method == 'POST':

#         if post.validate_on_submit():

#             new_post = Post(post.title.data, post.content.data)

#             db.session.add(new_post)
#             db.session.commit()

#             return redirect("/posts/%i" % (new_post.id), code=302)

#     return render_template("new_post.html", form=post)

# @app.route('/login', methods=['GET','POST'])
# def login():
#     form = SignupForm()
#     if request.method == 'GET':
#         return render_template('login.html', form=form)
#     elif request.method == 'POST':
#         if form.validate_on_submit():
#             user=User.query.filter_by(email=form.email.data).first()
#             if user:
#                 if user.password == form.password.data:
#                     login_user(user)
#                     return redirect('/')
#                 else:
#                     return "Incorrect email/password combination"
#             else:
#                 return "Account does not exist."

#     return "Hmmm... Make sure your email is valid."

# @app.route("/logout")
# @login_required
# def logout():
#     logout_user()
#     return redirect('/')


# @app.route('/signup', methods=['GET', 'POST'])
# def register():
#     form = SignupForm()

#     if request.method == 'GET':
#         return render_template('signup.html', form=form)

#     elif request.method == 'POST':

#         if form.validate_on_submit():

#             if User.query.filter_by(email=form.email.data).first():
#                 return "Email has already been used."

#             else:
#                 password = sha256_crypt.encrypt(form.password.data)

#                 newuser = User(form.email.data, password)
#                 db.session.add(newuser)
#                 db.session.commit()
#                 login_user(newuser)

#                 return redirect('/')

#     return "Hmmm... something didn't go quite right."

@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve
    """
    return User.query.get(user_id)


# Runs the app (in debug mode)
if __name__ == "__main__":
    app.run(debug=True, threaded=True)
