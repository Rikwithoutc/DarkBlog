from .database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)



class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    
    # likes = db.Column(db.Integer, default=0)
    content = db.Column(db.Text, nullable=False)

    user = db.relationship('User', backref=db.backref('posts', lazy=True))
    comments = db.relationship(
        'Comments',
        backref='post',
        cascade='all, delete-orphan',
        passive_deletes=True
    )

    likes = db.relationship(
        'Likes',
        backref='post',
        cascade='all, delete-orphan',
        passive_deletes=True
    )

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    commented_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    content = db.Column(db.Text, nullable=False)

    user = db.relationship('User', backref=db.backref('comments', lazy=True))

class Likes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete='CASCADE'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id", ondelete='CASCADE'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint("user_id", "post_id"),
    )



