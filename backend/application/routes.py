from flask import current_app as app, jsonify, request, abort
from application.models import User, Post, Comments, Likes
from application.database import db
from flask_jwt_extended import create_access_token, jwt_required, current_user


def role_required(role):
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            if not current_user.is_admin and role == 'admin':
                return jsonify(message="Unauthorized"), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper



@app.route('/login', methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"message": "Please fill all the fields"}), 400 
    
    if '@' not in email:
        return jsonify({"message": "Invalid email address"}), 400

    user = User.query.filter_by(email=email).one_or_none()
    if not user or user.password != password:
        return jsonify({"message": "Incorrect email or password"}), 401
    
    access_token = create_access_token(identity=user)
    return jsonify(access_token=access_token), 200

@app.route('/logout', methods=["POST"])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200



@app.route('/register', methods=["POST"])
def register():
    firstname = request.json.get("firstname", None)
    lastname = request.json.get("lastname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not firstname or not lastname or not email or not password:
        return jsonify({"message": "Please fill all the fields"}), 400 

    if firstname.strip() == "" or lastname.strip() == "" or email.strip() == "" or password.strip() == "": 
        return jsonify({"message": "Fields cannot be empty"}), 400
    
    if len(firstname) <= 2 and len(lastname) <= 2:
        return jsonify({"message" : "fisrtname and lastname must be atleast 3 characters long"}), 400
    
    if '@' not in email:
        return jsonify({"message": "Invalid email address"}), 400

    user = User.query.filter_by(email=email).one_or_none()

    if user:
        return jsonify({"message": "User already exists"}), 409

    user = User(
        firstname=firstname,
        lastname=lastname,
        email=email,
        password=password
    )
    db.session.add(user)
    db.session.commit()

    return jsonify(
        id=str(user.id),
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email
    ), 201



@app.route('/profile', methods=["GET"])
@jwt_required()
def profile():
    user = current_user
    return jsonify(
        id=str(user.id),
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
    ), 200



@app.route('/posts', methods=["GET"])
@jwt_required()
def get_posts():
    posts = Post.query.all()
    posts_list = [
        {
            "id": str(post.id),
            "created_at": post.created_at.isoformat(), 
            "likes": Likes.query.filter_by(post_id=post.id).count(),
            "liked_by_me" : Likes.query.filter_by(user_id=current_user.id, post_id=post.id).first() is not None,
            "user": {
                "id": str(post.user.id),
                "firstname": post.user.firstname,
                "lastname": post.user.lastname,
                "email": post.user.email,
            },

            "comments": [
                    {
                        "id": str(comment.id),
                        "user" : {
                            "id": str(comment.user.id),
                            "firstname": comment.user.firstname,
                            "lastname": comment.user.lastname,
                            "email": comment.user.email
                        },
                        "content": comment.content,
                        "commented_at": comment.commented_at.isoformat()
                    } for comment in post.comments
            ],
            
            "content": post.content
        }
        for post in posts
    ]

    return jsonify(posts_list), 200



@app.route('/create_post', methods=["POST"])
@jwt_required()
def create_post():
    content = request.json.get("content", None)

    if not content or content.strip() == "":
        return jsonify({"message": "Post content cannot be empty"}), 400 

    post = Post(
        user_id=current_user.id,
        created_at = db.func.now(),
        content=content
    )
    db.session.add(post)
    db.session.commit()

    return jsonify(
        id=str(post.id),
        user_id=str(post.user_id),
        likes=str(Likes.query.filter_by(post_id=post.id).count()),
        created_at=str(post.created_at),
        content=post.content
    ), 201


@app.route('/delete_post/<int:post_id>', methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify(message="Post not found"), 404
    
    if post.user.id != current_user.id and not current_user.is_admin:
        return jsonify(message="Unauthorized"), 403
    
    db.session.delete(post)
    db.session.commit()

    return jsonify(message="Post deleted successfully"), 200




@app.route('/post/<int:post_id>/comment', methods=["POST"])
@jwt_required()
def comment_post(post_id):
    content = request.json.get("content", None)

    if not content or content.strip() == "":
        return jsonify(message="Comment content cannot be empty"), 400

    post  = Post.query.get(post_id)
    if not post:
        return jsonify(message="Post not found"), 404
    
    comment = Comments(
        post_id = post_id,
        user_id = current_user.id,
        content = content,
        commented_at = db.func.now()
    )

    db.session.add(comment)
    db.session.commit()

    return jsonify(
        id = str(comment.id),
        post_id = str(comment.post_id),
        user_id = str(comment.user_id),
        content = comment.content
    ), 201

@app.route('/post/<int:post_id>/like', methods=["POST"])
@jwt_required()
def like_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify(message="Post not found"), 404
    
    existing_like = Likes.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    if existing_like:
        return jsonify(message="You have already liked this post"), 409
    
    like = Likes(
        user_id = current_user.id,
        post_id = post_id
    )

    # post.likes += 1

    db.session.add(like)
    db.session.commit()

    return jsonify(message="Post liked successfully"), 200


@app.route('/post/<int:post_id>/unlike', methods=["POST"])
@jwt_required()
def unlike_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify(message="Post not found"), 404
    
    existing_like = Likes.query.filter_by(user_id=current_user.id, post_id=post.id).first()

    if not existing_like:
        return jsonify(message="You have not liked this post"), 409
    
    db.session.delete(existing_like)
    db.session.commit()

    return jsonify(message="Post unliked successfully"), 200