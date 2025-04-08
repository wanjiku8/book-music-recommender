from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recommender.db'
app.config['UPLOAD_FOLDER'] = 'static/images'
db = SQLAlchemy(app)

# Models
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(50))
    genre = db.Column(db.String(30))
    description = db.Column(db.Text)
    image = db.Column(db.String(100))

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(50))
    bpm = db.Column(db.Integer)
    genre = db.Column(db.String(30))
    description = db.Column(db.Text)
    image = db.Column(db.String(100))

# Routes
@app.route('/')
def home():
    return "Welcome to the Book & Music Recommender API!"

@app.route('/books', methods=['GET', 'POST'])
def books():
    if request.method == 'GET':
        books = Book.query.all()
        return jsonify([{
            'id': b.id,
            'title': b.title,
            'author': b.author,
            'genre': b.genre,
            'description': b.description,
            'image': f"/images/{b.image}" if b.image else None
        } for b in books])
    else:
        data = request.form
        image = request.files.get('image')
        filename = None
        if image:
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        book = Book(
            title=data['title'],
            author=data['author'],
            genre=data['genre'],
            description=data['description'],
            image=filename
        )
        db.session.add(book)
        db.session.commit()
        return jsonify({'message': 'Book added successfully'}), 201

@app.route('/songs', methods=['GET', 'POST'])
def songs():
    if request.method == 'GET':
        songs = Song.query.all()
        return jsonify([{
            'id': s.id,
            'title': s.title,
            'artist': s.artist,
            'bpm': s.bpm,
            'genre': s.genre,
            'description': s.description,
            'image': f"/images/{s.image}" if s.image else None
        } for s in songs])
    else:
        data = request.form
        image = request.files.get('image')
        filename = None
        if image:
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        song = Song(
            title=data['title'],
            artist=data['artist'],
            bpm=int(data['bpm']),
            genre=data['genre'],
            description=data['description'],
            image=filename
        )
        db.session.add(song)
        db.session.commit()
        return jsonify({'message': 'Song added successfully'}), 201

@app.route('/images/<filename>')
def get_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/recommend/books', methods=['GET'])
def recommend_books():
    # Simple recommendation logic
    books = Book.query.order_by(Book.id.desc()).limit(3).all()
    return jsonify([{
        'id': b.id,
        'title': b.title,
        'image': f"/images/{b.image}" if b.image else None
    } for b in books])

@app.route('/recommend/songs', methods=['GET'])
def recommend_songs():
    # Simple recommendation based on BPM
    songs = Song.query.order_by(Song.bpm.desc()).limit(3).all()
    return jsonify([{
        'id': s.id,
        'title': s.title,
        'artist': s.artist,
        'image': f"/images/{s.image}" if s.image else None
    } for s in songs])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)