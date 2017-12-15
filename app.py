from flask import Flask, jsonify, render_template, request, redirect, url_for, Markup
from flask_sqlalchemy import SQLAlchemy
from config import SQLALCHEMY_DATABASE_URI
from models import db, Post, User
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from forms import SignupForm, PostForm
import markdown
# Creates the basic Flask app
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

# Basic Flask route
@app.route('/')
@app.route('/posts')
def index():
    action = "login"

    if current_user.is_authenticated:
        action = "logout"

    posts = Post.query.all()

    return render_template("index.html", navigation=posts, action=action)

@app.route('/login', methods=['GET','POST'])
def login():
    form = SignupForm()
    if request.method == 'GET':
        return render_template('login.html', form=form)
    elif request.method == 'POST':
        if form.validate_on_submit():
            user=User.query.filter_by(email=form.email.data).first()
            if user:
                if user.password == form.password.data:
                    login_user(user)
                    return redirect('/')               
                else:
                    return "Wrong password"            
            else:
                return "user doesn't exist"        
    else:
        return "form not validated"

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')

@app.route('/posts/new', methods=['GET', 'POST'])
@login_required
def new_post():
    post = PostForm()

    if request.method == 'GET':
        return render_template('new_post.html', form = post)

    elif request.method == 'POST':

        if post.validate_on_submit():

            new_post = Post(post.title.data, post.content.data)

            db.session.add(new_post)
            db.session.commit()

            return redirect("/posts/%i" % (new_post.id), code=302)

    return render_template("new_post.html", form=post)

@app.route('/signup', methods=['GET', 'POST'])
def register():
    form = SignupForm()

    if request.method == 'GET':
        return render_template('signup.html', form = form)

    elif request.method == 'POST':

        if form.validate_on_submit():

            if User.query.filter_by(email=form.email.data).first():
                return "Email address already exists" 

            else:
                newuser = User(form.email.data, form.password.data)
                db.session.add(newuser)
                db.session.commit()
                login_user(newuser)

                return "User created!!!"      

    return "Signup"

@app.route('/posts/<id>')
def posts(id):
    post = Post.query.filter_by(id=id).first()
    content = Markup(markdown.markdown(post.content))

    return render_template("post.html", post=post, content=content)

@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve
    """
    return User.query.get(user_id)


# Runs the app (in debug mode)
if __name__ == "__main__":
    app.run(debug=True)
