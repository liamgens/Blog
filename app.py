from flask import Flask, jsonify, request
from config import SQLALCHEMY_DATABASE_URI, TOKEN
from models import db, Post, User

app = Flask(__name__)

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
    """
    API endpoint for retreiving all the posts in the database.
    """
    posts = Post.query.all()
    posts = [i.serialize() for i in posts]
    return jsonify(posts) if posts else jsonify([])


@app.route('/posts/new', methods=['POST'])
def new_post():
    """
    API endpoint for creating a new post. Must be authenticated first.
    """
    data = request.get_json()
    token = data.get('token')

    if verify_token(token):
        post = Post(data.get('title'), data.get(
            'content'), data.get('image_url'))
        db.session.add(post)
        db.session.commit()

        return jsonify(post.id)

    return jsonify(None)


@app.route('/posts/<id>', methods=['GET'])
def posts(id):
    """
    API endpoint for retreiving a specific post by ID.
    """
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
    """
    API endpoint for logging in. Upon successful login, the user will recieve a token
    that can be used for authorized API calls.
    """
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    token = None
    try:
        if user and user.verify_password(data['password']):
            token = TOKEN
    except Exception as e:
        print(e)

    return jsonify({'token': token})


def verify_token(token):
    return token == TOKEN


# Runs the app (in debug mode)
if __name__ == "__main__":
    app.run(debug=True, threaded=True)
