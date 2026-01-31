from flask import current_app as app, jsonify, request, abort
from application.models import User, Post
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


# @app.route("/who_am_i")
# @jwt_required()
# def who_am_i():
#     user = current_user
#     return jsonify(
#         id=str(user.id),
#         firstname=user.firstname,
#         lastname=user.lastname,
#         email=user.email,
#     )


# @app.route("/admin_only")
# @role_required('admin')
# def admin_endpoint():
#     return jsonify(message="Welcome, admin!"), 200