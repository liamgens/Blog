from flask import Flask, jsonify, request, render_template
from config import SQLALCHEMY_DATABASE_URI
from models import db, Post, User
from flask_httpauth import HTTPBasicAuth


app = Flask(__name__)

auth = HTTPBasicAuth()

# Initializes the app to use the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
# Hide the weird Flask warning messages
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database created in models in the app's context
with app.app_context():
    db.init_app(app)
    db.create_all()


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


@app.route('/create', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User()
    user.username = data['username']
    user.hash_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return str('done')


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    authenticated = False
    try:
        if user and user.verify_password(data['password']):
            authenticated = True
    except Exception as e:
        print(e)
    return jsonify({'authenticated': authenticated})


# Runs the app (in debug mode)
if __name__ == "__main__":
    app.run(debug=True, threaded=True)
