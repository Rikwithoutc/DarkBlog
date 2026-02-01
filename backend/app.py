from dotenv import load_dotenv

load_dotenv()
import os

from flask import Flask
from application.config import LocalDevelopmentConfig
from application.database import db
from application.models import User, Post
from application.security import jwt
from flask_cors import CORS

app = None

def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    jwt.init_app(app)
    app.app_context().push()
    return app


app = create_app()

CORS(app,
     supports_credentials=True,
     origins=[os.getenv("FRONTEND_URL") or "http://localhost:5173"])

from application.routes import *

if __name__ == "__main__":

    db.create_all()
    # db.session.add(User(firstname="John", lastname="Doe", email="john@doe.com", password="123456", is_admin=True))
    # db.session.add(User(firstname="Rik", lastname="Dutta", email="rik@dutta.com", password="123456", is_admin=False))
    # db.session.commit()
    
    app.run()